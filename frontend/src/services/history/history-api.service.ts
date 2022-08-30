import { ApiPath, ContentType, HttpMethod, HistoryApiPath } from 'common/enums/enums';
import { Http } from '../http/http.service';
import { HistoryRequestDto, HistoryResponseDto } from '../../common/types/history/history';

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

  public addHVideoHistoryRecord(payload: HistoryRequestDto): Promise<HistoryResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.HISTORY}${HistoryApiPath.ROOT}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
  public getUserHVideoHistoryRecord(page: number): Promise<HistoryResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.HISTORY}${HistoryApiPath.ROOT}${page}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }
}

export { HistoryApi };
