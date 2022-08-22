import { createSecretKey } from 'crypto';
import jose, { jwtVerify } from 'jose';

export async function verifyJwt<T extends jose.JWTPayload>({
  jwt,
  secret,
}: {
  jwt: string;
  secret: string;
}): Promise<T> {
  const secretKey = createSecretKey(secret, 'utf-8');
  return (await jwtVerify(jwt, secretKey)).payload as T;
}
