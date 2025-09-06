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