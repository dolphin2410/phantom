import { APIResponse, HashHistory } from "../types/phantom_types"
import { browse_latest_hash } from "../util/phantom_utils"
import axios from "axios";

export async function mint_password(service_name: string, hash: string, raw_password: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(`${service_name}${hash}${raw_password}`);                    

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

export async function get_hash_history(auth_token: string): Promise<HashHistory[]> {
    const request = await axios.post("https://illusion-phantom-auth.netlify.app/netlify/functions/get_hashlist", "", {
        headers: {
            Authorization: `Bearer ${auth_token}`
        }
    });
    return (request.data as APIResponse).payload as HashHistory[]
}

export async function get_latest_hash(auth_token: string): Promise<HashHistory | null> {
    const hash_history_list = await get_hash_history(auth_token)

    return browse_latest_hash(hash_history_list)
}