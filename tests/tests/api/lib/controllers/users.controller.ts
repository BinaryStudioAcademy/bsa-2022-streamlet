import { ApiRequest } from '../request';
import { CONFIG } from '../../../config/config';

let baseUrl: string = CONFIG.BASE_URL;

export class UsersController {
  async getAllUsers(tokenVal: string) {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('users').bearerToken(tokenVal).send();
    return response;
  }
}
