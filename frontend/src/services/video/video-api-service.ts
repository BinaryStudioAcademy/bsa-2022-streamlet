import { ApiPath, VideoApiPath, HttpMethod } from 'common/enums/enums';
import { type VideoBaseResponseDto } from 'common/types/types';
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

  public getVideoData(videoId: string): Promise<VideoBaseResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.ROOT}/${videoId}`,
      options: {
        method: HttpMethod.GET,
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
}

export { VideoApi };
