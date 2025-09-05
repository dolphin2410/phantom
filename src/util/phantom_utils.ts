import { RefObject } from "react";

export function run_if_exists(ref: RefObject<HTMLDivElement | null>, callback: (element: HTMLDivElement) => void) {
    if (ref.current) {
        callback(ref.current)
    }
}