import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';

const http = new Http();

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { authApi };
