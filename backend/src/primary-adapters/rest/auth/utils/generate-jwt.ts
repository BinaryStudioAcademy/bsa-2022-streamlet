import * as jose from 'jose';
import { createSecretKey } from 'node:crypto';
import { CONFIG } from '~/configuration/config';

export async function generateJwt<T extends jose.JWTPayload>(payload: T): Promise<string> {
  const secretKey = createSecretKey(CONFIG.ENCRYPTION.JWT_SECRET, 'utf-8');

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(CONFIG.ENCRYPTION.JWT_LIFETIME)
    .sign(secretKey);
  return jwt;
}
