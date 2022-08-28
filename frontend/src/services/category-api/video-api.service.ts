import { HttpMethod, ApiPath } from 'common/enums/enums';
import { CategoryResponseDto } from 'shared/build';
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
}

export { CategoryApi };
