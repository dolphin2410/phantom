import "dotenv/config"

import type { Context } from "@netlify/functions";
import { type VerifyAuth0TokenResult, verifyAuth0Token } from "../lib/auth";
import { get_as_list, get_phantom_database, get_secret_ref } from "../lib/firebase";

export default async (request: Request, context: Context) => {
  let authResult: VerifyAuth0TokenResult;
  try {
    authResult = await verifyAuth0Token(request);
  } catch(e) {
    console.log(e)
    return new Response("Authorization required", { status: 401 });
  }

  const database = get_phantom_database()
  const ref = get_secret_ref(database, `/${authResult.result.payload.sub}/applications`)

  const full_info = await get_as_list(ref)

  return Response.json({
    is_success: true,
    payload: full_info
  });
};