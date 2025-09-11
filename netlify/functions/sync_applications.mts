import "dotenv/config"

import type { Context } from "@netlify/functions";
import { type VerifyAuth0TokenResult, verifyAuth0Token } from "../lib/auth";
import { get_as_list, get_phantom_database, get_secret_ref, set_as_list } from "../lib/firebase";

type SyncApplicationsQuery = {
  local_applications: string[]
}

export default async (request: Request, context: Context) => {
  let authResult: VerifyAuth0TokenResult;
  try {
    authResult = await verifyAuth0Token(request);
  } catch {
    return new Response("Authorization required", { status: 401 });
  }

  const req_body = (await request.json()) as SyncApplicationsQuery

  const database = get_phantom_database()
  const ref = get_secret_ref(database, `/${authResult.result.payload.sub}/applications`)

  const cloud_applications = await get_as_list(ref)
  const new_applications_list = [...new Set([...req_body.local_applications, ...cloud_applications])]

  await set_as_list(ref, new_applications_list)

  return Response.json({
    is_success: true,
    payload: "success"
  });
};