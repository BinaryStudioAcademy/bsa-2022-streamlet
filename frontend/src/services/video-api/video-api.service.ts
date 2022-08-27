import { HttpMethod, ApiPath, ContentType } from 'common/enums/enums';
import {
  DataVideo,
  VideoBaseResponseDto,
  CreateReactionResponseDto,
  ReactVideoActionPayloadType,
  VideoCommentResponseDto,
  VideoCommentRequestDto,
} from 'common/types/types';
import { Http } from '../http/http.service';
import { VideoApiPath } from '../../common/enums/api/api';

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

  public getVideos(): Promise<DataVideo> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }
  public getVideoDataVideoPage(videoId: string): Promise<VideoBaseResponseDto> {
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
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.REACTION}${VideoApiPath.ROOT}${videoId}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ isLike }),
      },
    });
  }
  public comment(payload: VideoCommentRequestDto): Promise<VideoCommentResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.COMMENT}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { VideoApi };
