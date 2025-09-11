import "dotenv/config"

import type { Context } from "@netlify/functions";
import { type VerifyAuth0TokenResult, verifyAuth0Token } from "../lib/auth";
import { append_list, get_as_list, get_phantom_database, get_secret_ref } from "../lib/firebase";

type HashHistory = {
    hash: string,
    created_date: string
}

const generate_new_hash = () => {
    const new_hash = [...Array(10)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('')
    const curr_time = (new Date()).toISOString().split('T')[0]

    const new_hash_history: HashHistory = {
        hash: new_hash,
        created_date: curr_time
    }

    return new_hash_history
}

const browse_latest_hash = (hash_list: HashHistory[]): HashHistory | null => {
    let latest_hash: HashHistory | null = null
    for (const item of hash_list) {
        if (latest_hash == null || new Date(latest_hash.created_date) < new Date(item.created_date)) {
            latest_hash = item
        }
    }
    return latest_hash
}

export default async (request: Request, context: Context) => {
  let authResult: VerifyAuth0TokenResult;
  try {
    authResult = await verifyAuth0Token(request);
  } catch {
    return new Response("Authorization required", { status: 401 });
  }

  const database = get_phantom_database()
  const tokens_ref = get_secret_ref(database, `/${authResult.result.payload.sub}/tokens`)

  const cloud_applications = (await get_as_list(tokens_ref)) as HashHistory[]
  const latest_cloud_hash = browse_latest_hash(cloud_applications)

  const new_hash = generate_new_hash()

  if (latest_cloud_hash == null || new Date(latest_cloud_hash.created_date) < new Date(new_hash.created_date)) {
    await append_list(tokens_ref, new_hash)
    
    return Response.json({
        is_success: true,
        payload: "Success"
      });
  }

  return Response.json({
    is_success: false,
    payload: "Exceeded max hash quota"
  });
};