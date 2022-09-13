import { HttpMethod, ApiPath } from 'common/enums/enums';
import { BaseVideoResponseArrayWithTotalNum, CategoryApiPath, CategoryResponseDto } from 'shared/build';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CategoryApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getCategories(): Promise<CategoryResponseDto[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CATEGORY}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public searchByCategories(categories: string[]): Promise<BaseVideoResponseArrayWithTotalNum> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CATEGORY}${CategoryApiPath.SEARCH}`,
      options: {
        method: HttpMethod.GET,
      },
      query: {
        categories,
      },
    });
  }
}

export { CategoryApi };
