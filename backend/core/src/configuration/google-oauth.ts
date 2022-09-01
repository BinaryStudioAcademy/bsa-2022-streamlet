import { google } from 'googleapis';

import { CONFIG } from '~/configuration/config';

export const oauth2Client = new google.auth.OAuth2(
  CONFIG.GOOGLE_GSI.CLIENT_ID,
  CONFIG.GOOGLE_GSI.SECRET,
  CONFIG.CLIENT_INFO.URL + '/google-athorization',
);
