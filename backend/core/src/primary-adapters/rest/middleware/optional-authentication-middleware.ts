import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { baseAthenticationMiddleware } from './base-authentication-middleware';

export const optionalAuthenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  return baseAthenticationMiddleware(req, _res, next, true);
};
