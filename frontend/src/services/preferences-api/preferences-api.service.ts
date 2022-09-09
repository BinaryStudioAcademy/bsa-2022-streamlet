import { HttpMethod, ApiPath } from 'common/enums/enums';
import { CategoryResponseDto, ContentType, UserApiPath, UserBindCategoriesDto } from 'shared/build';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PreferencesApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getPreferences(): Promise<CategoryResponseDto[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.USER}${UserApiPath.$PREFERENCES}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public bindPreferences(payload: Omit<UserBindCategoriesDto, 'id'>): Promise<CategoryResponseDto[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.USER}${UserApiPath.$BIND}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { PreferencesApi };
