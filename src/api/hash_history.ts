import { invoke } from "@tauri-apps/api/core"
import { HashHistory } from "../types/phantom_types"
import { generate_random_hash } from "../util/math"
import { load_database } from "./database"

export function create_hash_history(): HashHistory | null {
    const new_hash = generate_random_hash(10)
    const curr_time = (new Date()).toISOString().split('T')[0]

    const new_hash_history: HashHistory = {
        hash: new_hash,
        created_date: curr_time
    }

    let db = load_database()

    if (Object.values(db.list_hash_history.filter(e => e.created_date == curr_time)).length) {
        return null
    } else {
        db.list_hash_history.push(new_hash_history)
        return new_hash_history
    }
}

export async function mint_password(service_name: string, hash: string, raw_password: string): Promise<string> {
    return await invoke<string>("mint_password", { 
        serviceName: service_name,
        hash,
        rawPassword: raw_password    
    });
}

export function get_hash_history(): HashHistory[] {
    return load_database().list_hash_history
}

export function get_latest_hash(): HashHistory {
    const hash_history_list = get_hash_history()

    return hash_history_list[hash_history_list.length - 1]
}