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
  CreateCommentReactionRequestDto,
  CreateCommentReactionResponseDto,
  Comment,
  BaseReplyRequestDto,
  VideoPaginationParams,
  AddVideoViewResponseDto,
  AddVideoViewRequestDto,
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

  public getVideos(pagination?: VideoPaginationParams): Promise<DataVideo> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}`,
      options: {
        method: HttpMethod.GET,
      },
      ...(pagination && {
        query: {
          skip: pagination?.skip,
          take: pagination?.take,
        },
      }),
    });
  }

  public getGeneralVideos(): Promise<DataVideo> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.GENERAL_VIDEOS}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public getRecommendedVideos(pagination: VideoPaginationParams): Promise<DataVideo> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.RECOMMENDED_VIDEOS}`,
      options: {
        method: HttpMethod.GET,
      },
      ...(pagination && {
        query: {
          skip: pagination.skip,
          take: pagination.take,
        },
      }),
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

  public addVideoView(request: AddVideoViewRequestDto): Promise<AddVideoViewResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}/${request.videoId}${VideoApiPath.VIEW}`,
      options: {
        method: HttpMethod.POST,
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

  public getRepliesForComment(commentId: string): Promise<Comment[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.REPLIES_COMMENT}/${commentId}`,
      options: {
        method: HttpMethod.GET,
      },
    });
  }

  public addVideoCommentReply(payload: BaseReplyRequestDto): Promise<Comment[]> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.VIDEOS}${VideoApiPath.REPLIES_COMMENT}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { VideoApi };
