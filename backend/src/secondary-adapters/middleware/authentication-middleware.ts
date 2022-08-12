import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { CONFIG } from '~/configuration/config';
import { UserBaseResponseDto } from '~/shared/types/types';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { exceptionMessages } from '~/shared/enums/exceptions';

export const authenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
  }
  const token = getBearerTokenFromAuthHeader(authHeader);
  if (!token) {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
  }
  const secretKey = createSecretKey(CONFIG.ENCRYPTION.JWT_SECRET, 'utf-8');
  try {
    const payload = (await jwtVerify(token, secretKey)).payload;
    req.user = payload as UserBaseResponseDto;
  } catch {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN));
  }
  next();
};

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(' ')[1];
  return bearerToken || '';
};
