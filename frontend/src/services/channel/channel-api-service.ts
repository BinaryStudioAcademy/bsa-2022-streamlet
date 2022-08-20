import { ApiPath, HttpMethod, ChannelApiPath } from 'common/enums/enums';
import { CreateSubscriptionResponseDto } from 'common/types/types';
import { Http } from '../http/http.service';
type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChannelApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public createSubscription(channelId: string): Promise<CreateSubscriptionResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL}${ChannelApiPath.SUBSCRIPTION}${ChannelApiPath.ROOT}${channelId}`,
      options: {
        method: HttpMethod.POST,
      },
    });
  }
}

export { ChannelApi };
