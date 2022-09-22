import {
  GetPopularInputType,
  GetPopularLiveInputType,
  VideoRepository,
} from '../../../../src/core/video/port/video-repository';
import {
  BaseReplyRequestDto,
  CategorySearchRequestQueryDto,
  Comment,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  DataVideo,
  PopularVideoResponseDto,
  RecommendedVideosParams,
  TagSearchRequestQueryDto,
  UpdateVideoInfoDto,
  UpdateVideoVisibilityDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoPaginationParams,
} from 'shared/build';
import { VideoExpandedInfo } from '../../../../src/shared/types/video/video-expanded-dto-before-trimming';
import { VideoSearch, VideoWithChannel } from '../../../../src/shared/types/video/video-with-channel-dto.type';
import { VideoRepositoryFilters } from '../../../../src/core/video/port/video-repository-filters';
import { VideoWithReactionsAndComments } from '../../../../src/shared/types/video/video-with-reactions-and-comments-dto';
import { Video } from '@prisma/client';

export class TestVideoRepositoryAdapter implements VideoRepository {
  addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null> {
    // only for ignoring eslint errors
    if (!request || !authorId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  addCommentReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    // only for ignoring eslint errors
    if (!request || !videoId || !userId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    // only for ignoring eslint errors
    if (!request || !videoId || !userId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  addVideoCommentReply(request: BaseReplyRequestDto, authorId: string): Promise<Comment[]> {
    // only for ignoring eslint errors
    if (!request || !authorId) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  calculateCommentReaction(commentId: string): Promise<{ likeNum: number; dislikeNum: number }> {
    // only for ignoring eslint errors
    if (!commentId) {
      return Promise.resolve({ dislikeNum: 0, likeNum: 0 });
    }
    return Promise.resolve({ dislikeNum: 0, likeNum: 0 });
  }

  commentReactionByUser(commentId: string, userId: string): Promise<boolean | null> {
    // only for ignoring eslint errors
    if (!commentId || !userId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  getAll(queryParams?: { filters?: VideoRepositoryFilters; pagination?: VideoPaginationParams }): Promise<DataVideo> {
    const exampleData = {
      list: [],
      total: 0,
    };

    // only for ignoring eslint errors
    if (!queryParams) {
      return Promise.resolve(exampleData);
    }
    return Promise.resolve(exampleData);
  }

  getAuthorById(id: string): Promise<string | undefined> {
    // only for ignoring eslint errors
    if (!id) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(undefined);
  }

  getById(id: string): Promise<VideoExpandedInfo | null> {
    // only for ignoring eslint errors
    if (!id) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  getVideosByIds(ids: string[]): Promise<Video[]> {
    // only for ignoring eslint errors
    if (!ids) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  getPopular(arg: GetPopularInputType): Promise<PopularVideoResponseDto> {
    const exampleData = {
      list: [],
      currentPage: 1,
      lastPage: 1,
      category: 'bsa',
    };

    // only for ignoring eslint errors
    if (!arg) {
      return Promise.resolve(exampleData);
    }
    return Promise.resolve(exampleData);
  }

  getPopularLive(arg: GetPopularLiveInputType): Promise<PopularVideoResponseDto> {
    const exampleData = {
      list: [],
      currentPage: 1,
      lastPage: 1,
      category: 'bsa',
    };

    // only for ignoring eslint errors
    if (!arg) {
      return Promise.resolve(exampleData);
    }
    return Promise.resolve(exampleData);
  }

  getPopularVideoLength(category: string): Promise<number> {
    // only for ignoring eslint errors
    if (!category) {
      return Promise.resolve(0);
    }
    return Promise.resolve(0);
  }

  getRepliesForComment(commentId: string): Promise<Comment[]> {
    // only for ignoring eslint errors
    if (!commentId) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  getVideosBySearch(queryParams: VideoSearch): Promise<DataVideo> {
    const exampleData = {
      list: [],
      total: 0,
    };

    // only for ignoring eslint errors
    if (!queryParams) {
      return Promise.resolve(exampleData);
    }
    return Promise.resolve(exampleData);
  }

  reactionByUser(videoId: string, userId: string): Promise<boolean | null> {
    // only for ignoring eslint errors
    if (!videoId || !userId) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  removeCommentReactionAndAddNew(
    commentId: string,
    userId: string,
    isLike: boolean,
  ): Promise<CreateReactionResponseDto | null> {
    // only for ignoring eslint errors
    if (!commentId || !userId || !isLike) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  removeReactionAndAddNew(videoId: string, userId: string, isLike: boolean): Promise<CreateReactionResponseDto | null> {
    // only for ignoring eslint errors
    if (!videoId || !userId || !isLike) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  searchByCategories(
    searchByCategoryDto: CategorySearchRequestQueryDto,
  ): Promise<{ list: VideoWithChannel[]; total: number }> {
    const defaultSample = {
      list: [],
      total: 0,
    };
    // only for ignoring eslint errors
    if (!searchByCategoryDto) {
      return Promise.resolve(defaultSample);
    }
    return Promise.resolve(defaultSample);
  }

  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<VideoWithChannel[]> {
    // only for ignoring eslint errors
    if (!searchByTagsDto) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  addView(id: string): Promise<{ currentViews: number } | null> {
    // only for ignoring eslint errors
    if (!id) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  deleteByIds(ids: string[]): Promise<VideoWithReactionsAndComments[]> {
    if (!ids) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  getGeneralVideos(userId: string): Promise<DataVideo> {
    const defaultSample = {
      list: [],
      total: 0,
    };

    if (!userId) {
      return Promise.resolve(defaultSample);
    }
    return Promise.resolve(defaultSample);
  }

  getMyVideos(authorId: string): Promise<VideoWithReactionsAndComments[]> {
    if (!authorId) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  getRecommendedVideos(params: RecommendedVideosParams): Promise<DataVideo> {
    const defaultSample = {
      list: [],
      total: 0,
    };

    if (!params) {
      return Promise.resolve(defaultSample);
    }
    return Promise.resolve(defaultSample);
  }

  getSimilarVideos(videoId: string, paginationParams: Omit<RecommendedVideosParams, 'userId'>): Promise<DataVideo> {
    const defaultSample = {
      list: [],
      total: 0,
    };

    if (!videoId || !paginationParams) {
      return Promise.resolve(defaultSample);
    }

    return Promise.resolve(defaultSample);
  }

  updateVideoInfo(updateVideoInfo: UpdateVideoInfoDto): Promise<VideoWithReactionsAndComments | null> {
    if (!updateVideoInfo) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  updateVisibility(
    updateVideoVisibilityDto: UpdateVideoVisibilityDto,
  ): Promise<VideoWithReactionsAndComments[] | null> {
    if (!updateVideoVisibilityDto) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }
}
