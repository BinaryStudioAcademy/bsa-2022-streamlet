import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { UserBaseResponseDto } from '~/shared/types/types';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { exceptionMessages } from '~/shared/enums/messages';
import { verifyJwt } from '~/shared/helpers';
import { CONFIG } from '~/configuration/config';

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
  try {
    const payload = await verifyJwt<UserBaseResponseDto>({ jwt: token, secret: CONFIG.ENCRYPTION.ACCESS_TOKEN_SECRET });
    req.user = payload;
  } catch {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN));
  }
  next();
};

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(' ')[1];
  return bearerToken || '';
};
