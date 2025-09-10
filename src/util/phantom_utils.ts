import { ReactElement, RefObject } from "react";

export function run_if_exists<T>(ref: RefObject<T | null>, callback: (element: T) => void) {
    if (ref.current) {
        callback(ref.current)
    }
}

export function element_list_placeholder(element_list: ReactElement[], placeholder: ReactElement) {
    if (element_list.length == 0) {
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