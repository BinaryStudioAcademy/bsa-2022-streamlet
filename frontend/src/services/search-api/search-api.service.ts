import { Http } from 'services/http/http.service';
import { SearchDataResponseDto } from 'common/types/types';
import { ApiPath, VideoApiPath } from 'common/enums/enums';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class SearchApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async getSearchResults(searchPayload: { searchParamURL: string }): Promise<SearchDataResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.SEARCH}?${searchPayload.searchParamURL}`,
    });
  }
}

export { SearchApi };
