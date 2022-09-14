import { inject, injectable } from 'inversify';
import {
  CONTAINER_TYPES,
  PopularVideoResponseDto,
  PopularVideosRequestDtoType,
  VideoSearch,
} from '~/shared/types/types';
import { VideoRepository } from '~/core/video/port/video-repository';
import { BaseVideoResponseDto, DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import {
  BaseReplyRequestDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  Comment,
  VideoPaginationParams,
  StreamStatus,
  VideoInfoDto,
  UpdateVideoVisibilityDto,
  UpdateVideoInfoDto,
  RecommendedVideosParams,
} from 'shared/build';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';
import { POPULAR_VIDEO_CARD_IN_ONE_PAGE } from '~/shared/constants/constants';
import { usePagination } from '~/shared/helpers';
import { getSearchQuerySplit } from '~/shared/helpers/search/get-search-query-split.helper';
import { castToVideoInfoDto } from './dtos/cast-to-video-info';

@injectable()
export class VideoService {
  private videoRepository: VideoRepository;

  constructor(@inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository) {
    this.videoRepository = videoRepository;
  }

  getAllVideos(paginationParams: VideoPaginationParams): Promise<DataVideo> {
    return this.videoRepository.getAll({ pagination: paginationParams });
  }

  getById(id: string): Promise<VideoExpandedInfo | null> {
    return this.videoRepository.getById(id);
  }

  async getSimilarVideos(id: string): Promise<BaseVideoResponseDto[]> {
    const video = await this.videoRepository.getById(id);
    if (!video) {
      return [];
    }
    const query: VideoSearch = {
      searchText: getSearchQuerySplit(video.name).join(' | '),
      type: [StreamStatus.FINISHED, StreamStatus.LIVE],
      sortBy: [],
      duration: {
        gte: undefined,
        lte: undefined,
      },
      date: undefined,
    };
    const searchResult = await this.videoRepository.getVideosBySearch(query, {
      excludeIds: [id],
    });
    return searchResult.list;
  }

  getAuthorByVideoId(id: string): Promise<string | undefined> {
    return this.videoRepository.getAuthorById(id);
  }

  addComment(request: VideoCommentRequestDto, userId: string): Promise<VideoCommentResponseDto | null> {
    return this.videoRepository.addComment(request, userId);
  }

  async addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.videoRepository.reactionByUser(videoId, userId);

    if (userReaction !== null) {
      return this.videoRepository.removeReactionAndAddNew(videoId, userId, request.isLike);
    }
    return this.videoRepository.addReaction(request, videoId, userId);
  }

  async addVideoView(videoId: string): Promise<{ currentViews: number } | null> {
    const currentViews = await this.videoRepository.addView(videoId);
    return currentViews;
  }

  async addCommentReaction(
    request: CreateReactionRequestDto,
    commentId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.videoRepository.commentReactionByUser(commentId, userId);

    if (userReaction !== null) {
      return this.videoRepository.removeCommentReactionAndAddNew(commentId, userId, request.isLike);
    }
    return this.videoRepository.addCommentReaction(request, commentId, userId);
  }

  getVideosBySearch(queryParams: VideoSearch): Promise<DataVideo> {
    return this.videoRepository.getVideosBySearch(queryParams);
  }

  async getPopular(request: PopularVideosRequestDtoType): Promise<PopularVideoResponseDto> {
    const { page: pageNumber, category } = request;
    const allDataLength = await this.videoRepository.getPopularVideoLength(category);
    const paginationParam = usePagination({ allDataLength, pageNumber, itemInOnePage: POPULAR_VIDEO_CARD_IN_ONE_PAGE });

    if (request.category === 'live') {
      return this.videoRepository.getPopularLive(paginationParam);
    }

    return this.videoRepository.getPopular({ category, ...paginationParam });
  }

  async getRepliesForComment(commentId: string): Promise<Comment[]> {
    return await this.videoRepository.getRepliesForComment(commentId);
  }

  async addVideoCommentReply(request: BaseReplyRequestDto, userId: string): Promise<Comment[]> {
    return this.videoRepository.addVideoCommentReply(request, userId);
  }

  //NOTE: remove segments and poster from cloud
  async deleteByIds(ids: string[]): Promise<VideoInfoDto[] | null> {
    const deletedVideos = await this.videoRepository.deleteByIds(ids);
    if (!deletedVideos.length) {
      return null;
    }

    return deletedVideos.map((video) => castToVideoInfoDto(video));
  }

  async getMyVideos(authorId: string): Promise<VideoInfoDto[]> {
    const videos = await this.videoRepository.getMyVideos(authorId);

    return videos.map((video) => castToVideoInfoDto(video));
  }

  async updateVisibility({ videoId, visibility }: UpdateVideoVisibilityDto): Promise<VideoInfoDto | null> {
    const isVideoExists = await this.videoRepository.getById(videoId);
    if (!isVideoExists) {
      return null;
    }
    const video = await this.videoRepository.updateVisibility({
      videoId,
      visibility,
    });

    if (!video) {
      return null;
    }

    return castToVideoInfoDto(video);
  }

  async updateInfo({ videoId, title, description }: UpdateVideoInfoDto): Promise<VideoInfoDto | null> {
    const isVideoExists = await this.videoRepository.getById(videoId);
    if (!isVideoExists) {
      return null;
    }
    const video = await this.videoRepository.updateVideoInfo({
      videoId,
      title,
      description,
    });

    if (!video) {
      return null;
    }

    return castToVideoInfoDto(video);
  }

  async getGeneralVideos(userId: string): Promise<DataVideo> {
    return await this.videoRepository.getGeneralVideos(userId);
  }

  async getRecommendedVideos(params: RecommendedVideosParams): Promise<DataVideo> {
    return await this.videoRepository.getRecommendedVideos(params);
  }
}
