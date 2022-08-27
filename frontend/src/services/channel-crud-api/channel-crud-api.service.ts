import { Http } from 'services/http/http.service';
import { ChannelInfoRequestDto, ChannelInfoResponseDto } from 'common/types/types';
import { ApiPath } from 'common/enums/enums';

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

  async getMyChannelInfo(): Promise<ChannelInfoResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.MY_CHANNEL}`,
    });
  }
}

export { ChannelCrudApi };
