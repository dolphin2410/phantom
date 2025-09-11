import "dotenv/config"

import type { Context } from "@netlify/functions";
import { type VerifyAuth0TokenResult, verifyAuth0Token } from "../lib/auth";
import { get_as_list, get_phantom_database, get_secret_ref } from "../lib/firebase";

type HashHistory = {
    hash: string,
    created_date: string
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

  return Response.json({
    is_success: false,
    payload: cloud_applications
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION"
    }
  });
};