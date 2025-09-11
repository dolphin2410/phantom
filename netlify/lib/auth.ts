import { type JWTVerifyResult, createRemoteJWKSet, jwtVerify } from "jose";

export type VerifyAuth0TokenResult<
  CustomClaims extends Record<string, unknown> = Record<string, unknown>,
> = {
  token: string;
  result: JWTVerifyResult & { payload: CustomClaims }
}

export const verifyAuth0Token = async <
    CustomClaims extends Record<string, unknown>>(request: Request): Promise<VerifyAuth0TokenResult<CustomClaims>> => {
  const authorization = request.headers.get("Authorization") ?? ""
  const [type, token, ...parts] = authorization
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")

  if (type !== "Bearer" || parts.length !== 0) {
    throw new Error("Missing or invalid Authorization header");
  }

  const JWKS = createRemoteJWKSet(
    new URL(".well-known/jwks.json", "https://dev-dujiupliiaptbdsr.us.auth0.com/"),
  )
  
  let result = (await jwtVerify(token, JWKS, {
    issuer: "https://dev-dujiupliiaptbdsr.us.auth0.com/",
    audience: "https://audience.sujebi.tech",
  })) as unknown as JWTVerifyResult & { payload: CustomClaims }

  return { token, result }
}