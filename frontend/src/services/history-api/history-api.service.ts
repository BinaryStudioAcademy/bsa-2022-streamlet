import { ApiPath, HistoryApiPath, HttpMethod } from 'common/enums/enums';
import { Http } from '../http/http.service';
import { HistoryResponseDto } from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class HistoryApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }
  public getUserHistory(): Promise<HistoryResponseDto[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.PROFILE}${HistoryApiPath.ROOT}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }
}

export { HistoryApi };
