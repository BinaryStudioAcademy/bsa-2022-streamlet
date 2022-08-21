import { HttpMethod, VideoApiPath } from 'common/enums/enums';
import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class VideoApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getVideos(): Promise<unknown> {
    // replace any for response video DTO
    return this.#http.load({
      url: `${this.#apiPrefix}${VideoApiPath.ROOT}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }
}

export { VideoApi };
