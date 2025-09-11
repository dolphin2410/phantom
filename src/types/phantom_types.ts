export type HashHistory = {
    hash: string,
    created_date: string
}

export type Application = {
    service_name: string,
    img: string
}

export type APIResponse = {
    is_success: boolean,
    payload: any
}