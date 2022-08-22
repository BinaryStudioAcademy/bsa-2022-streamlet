import * as jose from 'jose';
import { createSecretKey } from 'node:crypto';

export async function generateJwt<T extends jose.JWTPayload>({
  payload,
  lifetime,
  secret,
}: {
  payload: T;
  lifetime: string;
  secret: string;
}): Promise<string> {
  const secretKey = createSecretKey(secret, 'utf-8');

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(lifetime)
    .sign(secretKey);
  return jwt;
}
