import { ApiRequest } from '../request';

let baseUrl: string = global.appConfig.baseUrl;

export class HistoryController {
  async userHistory(tokenVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(baseUrl)
      .method('GET')
      .url('history')
      .bearerToken(tokenVal)
      .send();
    return response;
  }
}
