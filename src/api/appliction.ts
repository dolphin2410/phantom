import { Application } from "../types/phantom_types"
import { load_database, save_database } from "./database"

export function get_applications(): Application[] {
    return load_database().list_applications
}

export function add_application(application: Application): boolean {
    const curr_db = load_database()
    const curr_apps = curr_db.list_applications

    if (curr_apps.filter(e => e.service_name == application.service_name).length != 0) {
        return false
    }

    curr_db.list_applications.push(application)
    save_database(curr_db)

    return true
}