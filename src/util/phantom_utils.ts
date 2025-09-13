import { ReactElement, RefObject } from "react";
import { HashHistory } from "../types/phantom_types";

export function run_if_exists<T>(ref: RefObject<T | null>, callback: (element: T) => void) {
    if (ref.current) {
        callback(ref.current)
    }
}

export function element_list_placeholder(element_list: ReactElement[], placeholder: ReactElement) {
    if (element_list.length === 0) {
        return placeholder
    }

    return element_list
}

// export async function favicon_data_url(service_url: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const img = new Image()
//     img.crossOrigin = "anonymous"
//     img.onload = () => {
//         const canvas = document.createElement("canvas")
//         canvas.width = img.width
//         canvas.height = img.height
//         const ctx = canvas.getContext("2d")
//         ctx!!.drawImage(img, 0, 0)
//         resolve(canvas.toDataURL())
//     }
//     img.onerror = reject
//     img.src = `https://www.google.com/s2/favicons?sz=128&domain=${service_url}`
//   })
// }

export function google_favicon_url(service_url: string): string {
    return `https://www.google.com/s2/favicons?sz=128&domain=${service_url ? service_url : 'q'}`
}

export const browse_latest_hash = (hash_list: HashHistory[]): HashHistory | null => {
    let latest_hash: HashHistory | null = null
    for (const item of hash_list) {
        if (!latest_hash || new Date(latest_hash.created_date) < new Date(item.created_date)) {
            latest_hash = item
        }
    }
    return latest_hash
}