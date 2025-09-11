import { Application } from "../types/phantom_types"
import { google_favicon_url } from "../util/phantom_utils"

export function stringlist2applist(stringlist: string[]): Application[] {
    return stringlist.map(e => ({ service_name: e, img: google_favicon_url(e) }))
}

export function applist2stringlist(applist: Application[]): string[] {
    return applist.map(e => e.service_name)
}