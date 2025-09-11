import axios from "axios";
import { APIResponse, Application } from "../types/phantom_types";
import { applist2stringlist, stringlist2applist } from "./appliction";

export async function fetch_applications_list(auth_token: string): Promise<Application[]> {
    const request = await axios.post("https://illusion-phantom-auth.netlify.app/netlify/functions/get_applications", "", {
        headers: {
            "Authorization": `Bearer ${auth_token}`
        }
    })
    const response = (request.data as APIResponse)

    return stringlist2applist(response.payload as string[])
}

export async function upload_applications_list(auth_token: string, applications: Application[]): Promise<boolean> {
    const request_body = {
        local_applications: applist2stringlist(applications)
    }

    const request = await axios.post(
        "https://illusion-phantom-auth.netlify.app/netlify/functions/sync_applications", 
        JSON.stringify(request_body), 
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            }
        })
    
    const response = (request.data as APIResponse)

    return response.is_success
}