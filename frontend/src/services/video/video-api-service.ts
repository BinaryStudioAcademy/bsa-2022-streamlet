import { ApiPath, VideoApiPath, HttpMethod, ContentType } from 'common/enums/enums';
import { CreateReactionResponseDto, ReactVideoActionPayloadType, type VideoBaseResponseDto } from 'common/types/types';
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
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.ROOT}${videoId}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }
  public react(payload: ReactVideoActionPayloadType): Promise<CreateReactionResponseDto> {
    const { videoId, isLike } = payload;
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.ROOT}${VideoApiPath.REACTION}${
        VideoApiPath.ROOT
      }${videoId}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ isLike }),
      },
    });
  }
}

export { VideoApi };
