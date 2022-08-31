import { ApiRequest } from '../request';

let baseUrl: string = global.appConfig.baseUrl;

export class UsersController {
  async getAllUsers(tokenVal: string) {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('users').bearerToken(tokenVal).send();
    return response;
  }
}
