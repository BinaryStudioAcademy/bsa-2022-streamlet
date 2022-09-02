import { HttpMethod, ApiPath } from 'common/enums/enums';
import { DataVideo } from 'common/types/types';
import {
  ContentType,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoApiPath,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoExpandedResponseDto,
  CreateCommentReactionRequestDto,
  CreateCommentReactionResponseDto,
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

  public commentReact(
    payload: CreateCommentReactionRequestDto & { commentId: string },
  ): Promise<CreateCommentReactionResponseDto> {
    const { commentId, isLike } = payload;
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.COMMENT}${VideoApiPath.REACTION}${
        VideoApiPath.ROOT
      }${commentId}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ isLike }),
      },
    });
  }
}

export { VideoApi };
