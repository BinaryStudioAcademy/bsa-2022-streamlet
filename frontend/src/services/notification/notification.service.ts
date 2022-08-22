import { ApiPath, ContentType, HttpMethod, NotificationApiPath } from 'common/enums/enums';
import { NotificationBaseResponseDto, NotificationFilter, NotificationListResponseDto } from 'common/types/types';
import { Http } from 'services/http/http.service';
import { DefaultRequestParam } from 'shared/build';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class NotificationApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(filter: NotificationFilter): Promise<NotificationListResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.NOTIFICATION}`,
      options: {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
      query: filter,
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public getOne({ id }: DefaultRequestParam): Promise<NotificationBaseResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.NOTIFICATION}${id}`,
      options: {
        method: HttpMethod.GET,
        contentType: ContentType.JSON,
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public readAll(): Promise<NotificationListResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.NOTIFICATION}${NotificationApiPath.READ}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }

  public readOne({ id }: DefaultRequestParam): Promise<NotificationBaseResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.NOTIFICATION}${NotificationApiPath.READ}/${id}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
}

export { NotificationApi };
