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
    const request = await axios.post("/.netlify/functions/get_hashlist", "", {
        headers: {
            Authorization: `Bearer ${auth_token}`
        }
    });
    return (request.data as APIResponse).payload as HashHistory[]
}

export async function get_latest_hash(auth_token: string): Promise<HashHistory | null> {
    const hash_history_list = await get_hash_history(auth_token)

    let latest_hash_curr = browse_latest_hash(hash_history_list)

    if (!latest_hash_curr) {
        const renew_req = await axios.post("/.netlify/functions/renew_hash", "", {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })

        const { is_success } = (renew_req.data as APIResponse)

        if (is_success) {
            return get_latest_hash(auth_token)
        } else {
            return null
        }
    }

    return latest_hash_curr
}