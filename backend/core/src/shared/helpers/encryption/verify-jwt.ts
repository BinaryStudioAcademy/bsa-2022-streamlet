import { createSecretKey } from 'crypto';
import jose, { jwtVerify } from 'jose';
import { CONFIG } from '~/configuration/config';

export async function verifyJwt<T extends jose.JWTPayload>(jwt: string): Promise<T> {
  const secretKey = createSecretKey(CONFIG.ENCRYPTION.JWT_SECRET, 'utf-8');
  return (await jwtVerify(jwt, secretKey)).payload as T;
}
