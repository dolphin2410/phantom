import { Application } from "../types/phantom_types";
import { get_applications } from "./appliction";

export function fetch_applications_list(token: string): Application[] {
    return get_applications()
}

export function save_applications_list(token: string, applications: Application[]) {

}

export function save_hash_history(token: string) {

}