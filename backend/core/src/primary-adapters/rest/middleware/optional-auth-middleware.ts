import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { UserBaseResponseDto } from '~/shared/types/types';
import { verifyJwt } from '~/shared/helpers';
import { getBearerTokenFromAuthHeader } from '~/primary-adapters/rest/middleware/authentication-middleware';

export const optionalAuthenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next();
  }
  const token = getBearerTokenFromAuthHeader(authHeader);
  if (!token) {
    return next();
  }
  try {
    const payload = await verifyJwt<UserBaseResponseDto>(token);
    req.user = payload;
  } catch {
    return next();
  }
  next();
};
