import { Http } from 'services/http/http.service';
import { ApiPath } from 'common/enums/enums';
import { ContentType, CreateChannelStatRequestDto, CreateManyVideoStatsRequestDto, HttpMethod } from 'shared/build';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class StatsApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async sendChannelStatEvent(request: { id: string; stats: CreateChannelStatRequestDto['stats'] }): Promise<boolean> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STATS}/${request.id}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ ...request.stats }),
      },
    });
  }

  async sendManyVideoStatsEvent(request: CreateManyVideoStatsRequestDto): Promise<Record<string, boolean>> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEO_STATS}/`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(request),
      },
    });
  }
}

export { StatsApi };
