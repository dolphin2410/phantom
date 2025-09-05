import { Application, HashHistory } from "../types/phantom_types"

export type PhantomDatabase = {
    list_hash_history: HashHistory[],
    list_applications: Application[]
}

// TODO remove this
let in_memory_storage: PhantomDatabase = {
    list_hash_history: [
        {
            hash: "A6EF22AA34",
            created_date: "2025-08-01"
        },
        {
            hash: "B6FF3E4ADC",
            created_date: "2025-08-15"
        },
        {
            hash: "64EFAA9BCA",
            created_date: "2025-09-01"
        }
    ],
    list_applications: [
        {
            service_name: "google.com"
        },
        {
            service_name: "instagram.com"
        },
        {
            service_name: "github.com"
        }
    ]
}

export function load_database(): PhantomDatabase {
    return in_memory_storage
}

export function save_database(database: PhantomDatabase) {
    in_memory_storage = database
}