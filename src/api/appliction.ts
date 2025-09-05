import { Application } from "../types/phantom_types"
import { load_database } from "./database"

export function get_applications(): Application[] {
    return load_database().list_applications
}