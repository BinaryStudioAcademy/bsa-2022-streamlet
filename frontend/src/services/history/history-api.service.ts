import { ApiPath, ProfileApiPath, ContentType, HttpMethod } from 'common/enums/enums';
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
      url: `${this.#apiPrefix}${ApiPath.HISTORY}${ProfileApiPath}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { HistoryApi };
