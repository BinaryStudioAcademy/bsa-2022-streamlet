import express from 'express';

import { GoogleExtendedRequest } from '~/shared/types/types';
import { OAuth2Client } from 'google-auth-library';

export const googleMiddleware = (oauth2Client: OAuth2Client) => {
  return (req: GoogleExtendedRequest, _res: express.Response, next: express.NextFunction): void => {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
    });

    req.url = authorizationUrl;

    next();
  };
};
