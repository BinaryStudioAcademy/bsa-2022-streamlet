import { Http } from 'services/http/http.service';
import { ChannelInfoRequestDto, ChannelInfoResponseDto } from 'common/types/types';
import { ApiPath } from 'common/enums/enums';
import {
  ChannelCrudApiPath,
  ChannelProfileUpdateDto,
  ChannelProfileUpdateResponseDto,
  ContentType,
  HttpMethod,
} from 'shared/build';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChannelCrudApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async getChannelInfo(request: ChannelInfoRequestDto): Promise<ChannelInfoResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}/${request.id}`,
    });
  }

  async getMyChannel(): Promise<ChannelProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}/author`,
    });
  }

  async updateChannelInfo({ id, ...payload }: ChannelProfileUpdateDto): Promise<ChannelProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}${ChannelCrudApiPath.ROOT}/${id}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ id, ...payload }),
      },
    });
  }
}

export { ChannelCrudApi };
