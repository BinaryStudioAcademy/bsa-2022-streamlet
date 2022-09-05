import { ApiPath, HttpMethod, HistoryApiPath } from 'common/enums/enums';
import { Http } from '../http/http.service';
import { HistoryResponseDto } from '../../common/types/history/history';
import { BatchPayload } from '../../common/types/batch-payload/batch-payload';

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

  public getUserHVideoHistoryRecord(page: number): Promise<HistoryResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.HISTORY}${HistoryApiPath.ROOT}${page}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public deleteAllUserHistory(): Promise<BatchPayload> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.HISTORY}${HistoryApiPath.DELETE}`,
      options: {
        method: HttpMethod.DELETE,
      },
    });
  }
}

export { HistoryApi };
