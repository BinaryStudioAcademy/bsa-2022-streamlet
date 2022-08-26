import express from 'express';
import { ExtendedRequest } from '~/shared/types/express';
import { removeParamsFromRoutesPath } from '~/shared/helpers';
import { optionalAuthRoutesEnum } from '~/shared/enums/enums';

export const optionalAuthenticationMiddleware = async (
  req: ExtendedRequest,
  _res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const optionalAuthRoute = Object.entries(optionalAuthRoutesEnum);
  optionalAuthRoute.forEach((optionalRouteData) => {
    const optionalRoute = optionalRouteData[1];
    const optionalAuthRoutePath = optionalRoute.CONTROLLER_PATH;
    const optionalAuthRouteMethod = optionalRoute.METHOD;
    const reqPathWithoutParams = removeParamsFromRoutesPath(req.path);
    if (req.method === optionalAuthRouteMethod && reqPathWithoutParams === optionalAuthRoutePath) {
      req.isOptionalAuth = true;
    }
  });
  next();
};
