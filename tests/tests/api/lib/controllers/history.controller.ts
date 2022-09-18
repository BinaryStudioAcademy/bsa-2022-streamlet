import { ApiRequest } from '../request';
import { CONFIG } from '../../../config/config';

export class HistoryController {
  async userHistory(tokenVal: string) {
    const response = await new ApiRequest()
      .prefixUrl(CONFIG.BASE_URL)
      .method('GET')
      .url('history/1')
      .bearerToken(tokenVal)
      .send();
    return response;
  }
}
