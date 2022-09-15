/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { appConfig } from '../../config/dev.config';
import { ApiRequest } from '../request';

const { baseUrl } = appConfig;

export class UsersController {
  async getAllUsers(tokenVal: string) {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('users').bearerToken(tokenVal).send();
    return response;
  }
}
