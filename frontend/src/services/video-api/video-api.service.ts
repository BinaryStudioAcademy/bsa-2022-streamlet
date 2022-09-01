import { HttpMethod, ApiPath } from 'common/enums/enums';
import { DataVideo } from 'common/types/types';
import {
  ContentType,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  PopularVideoResponseDto,
  PopularVideosRequestDtoType,
  VideoApiPath,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoExpandedResponseDto,
} from 'shared/build';
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

  public getVideos(): Promise<DataVideo> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public getSingleVideo(videoId: string): Promise<VideoExpandedResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}/${videoId}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public react(payload: CreateReactionRequestDto & { videoId: string }): Promise<CreateReactionResponseDto> {
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
  public getPopular(payload: PopularVideosRequestDtoType): Promise<PopularVideoResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.POPULAR}`,
      options: {
        method: HttpMethod.GET,
      },
      query: {
        ...payload,
      },
    });
  }
}

export { VideoApi };
