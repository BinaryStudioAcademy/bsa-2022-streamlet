export const getGoogleOAuthURL = (clientId: string): string => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const redirect_uris = ['http://localhost:3000', 'https://dev.streamlet.tk'];

  const options = {
    redirect_uri: redirect_uris[0],
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' ',
    ),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
