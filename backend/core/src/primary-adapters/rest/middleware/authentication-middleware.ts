import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { UserBaseResponseDto } from '~/shared/types/types';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { exceptionMessages } from '~/shared/enums/messages';
import { verifyJwt } from '~/shared/helpers';
import { CONFIG } from '~/configuration/config';
import { optionalAuthRoutesEnum } from '~/shared/enums/enums';

export const authenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const isAuthOptional = req.path === optionalAuthRoutesEnum.GET_VIDEO_BY_ID;
  const authHeader = req.headers['authorization'];
  if (!authHeader && !isAuthOptional) {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
  }
  const token = getBearerTokenFromAuthHeader(authHeader as string);
  if (!token && !isAuthOptional) {
    return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
  }
  try {
    const payload = await verifyJwt<UserBaseResponseDto>({ jwt: token, secret: CONFIG.ENCRYPTION.ACCESS_TOKEN_SECRET });
    req.user = payload;
  } catch {
    if (!isAuthOptional) {
      return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN));
    }
  }
  next();
};

export const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(' ')[1];
  return bearerToken || '';
};
