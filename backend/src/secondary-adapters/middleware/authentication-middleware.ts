import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { CONFIG } from '~/configuration/config';
import { UserBaseResponseDto } from '~/shared/types/types';
import { Unauthorized } from '~/shared/exceptions/unauthorized';
import { exceptionMessages } from '~/shared/enums/exceptions';

export const authenticationMiddleware =
  (isAuthRequred = true) =>
  async (req: ExtendedRequest, _res: express.Response, next: express.NextFunction): Promise<void> => {
    req.user = null;
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      if (isAuthRequred) {
        return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
      }
      return next();
    }
    const token = (authHeader as string).split(' ')[1];
    if (!token) {
      if (isAuthRequred) {
        return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_NO_TOKEN));
      }
      return next();
    }
    const secretKey = createSecretKey(CONFIG.ENCRYPTION.JWT_SECRET, 'utf-8');
    let payload;
    try {
      payload = (await jwtVerify(token, secretKey)).payload;
    } catch {
      if (isAuthRequred) {
        return next(new Unauthorized(exceptionMessages.auth.UNAUTHORIZED_INCORRECT_TOKEN));
      }
      return next();
    }
    req.user = payload as UserBaseResponseDto;
    next();
  };
