import { Http } from 'services/http/http.service';
import { ChannelInfoRequestDto, ChannelInfoResponseDto, OwnChannelResponseDto } from 'common/types/types';
import { ApiPath } from 'common/enums/enums';
import {
  ChannelCrudApiPath,
  ChannelProfileUpdateDto,
  ChannelProfileUpdateMediaRequestDto,
  ChannelProfileUpdateResponseDto,
  ContentType,
  DefaultRequestParam,
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
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}/${id}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ id, ...payload }),
      },
    });
  }

  async updateChannelAvatar({
    id,
    base64Str,
  }: ChannelProfileUpdateMediaRequestDto & DefaultRequestParam): Promise<ChannelProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}${ChannelCrudApiPath.AVATAR}/${id}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ id, base64Str }),
      },
    });
  }

  async updateChannelBanner({
    id,
    base64Str,
  }: ChannelProfileUpdateMediaRequestDto & DefaultRequestParam): Promise<ChannelProfileUpdateResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_CRUD}${ChannelCrudApiPath.BANNER}/${id}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ id, base64Str }),
      },
    });
  }

  async getMyChannelInfo(): Promise<OwnChannelResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}`,
    });
  }
}

export { ChannelCrudApi };
