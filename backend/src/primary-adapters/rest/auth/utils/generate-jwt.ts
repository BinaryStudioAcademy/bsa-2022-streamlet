import * as jose from 'jose';
import { createSecretKey } from 'node:crypto';

export async function generateJwt<T extends jose.JWTPayload>(payload: T): Promise<string> {
  // TODO: add real secret and exp
  const secretKey = createSecretKey('ShVmYq3t6w9z$C&F)J@NcRfTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v8y/B?E(H+M', 'utf-8');

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secretKey);
  return jwt;
}
