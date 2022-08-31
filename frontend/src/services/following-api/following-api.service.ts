import { ApiPath, FollowingApiPath } from 'common/enums/enums';
import { VideosLiveResponseDto, VideosOfflineResponseDto } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class FollowingApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async loadOfflineVideos(): Promise<VideosOfflineResponseDto> {
    return this.#http.load<VideosOfflineResponseDto>({
      url: `${this.#apiPrefix}${ApiPath.FOLLOWING}${FollowingApiPath.VIDEOS_OFFLINE}`,
    });
  }

  async loadLiveVideos(): Promise<VideosLiveResponseDto> {
    return this.#http.load<VideosLiveResponseDto>({
      url: `${this.#apiPrefix}${ApiPath.FOLLOWING}${FollowingApiPath.VIDEOS_LIVE}`,
    });
  }
}

export { FollowingApi };
