import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  CategorySearchRequestQueryDto,
  TagSearchRequestQueryDto,
  PopularVideoResponseDto,
  BaseReplyRequestDto,
  Comment,
  VideoPaginationParams,
  RecommendedVideosParams,
} from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';
import { VideoRepositoryFilters } from './video-repository-filters';
import { VideoSearch } from '~/shared/types/types';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';
import { VideoSearchFilters } from './video-search-filters';

export type GetPopularInputType = {
  category: string;
  take: number;
  skip: number;
  lastPage: number;
  currentPage: number;
};

export type GetPopularLiveInputType = {
  take: number;
  skip: number;
  lastPage: number;
  currentPage: number;
};

export interface VideoRepository {
  getById(id: string): Promise<VideoExpandedInfo | null>;
  addView(id: string): Promise<{ currentViews: number } | null>;
  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<VideoWithChannel[]>;
  searchByCategories(searchByCategoryDto: CategorySearchRequestQueryDto): Promise<VideoWithChannel[]>;
  getAuthorById(id: string): Promise<string | undefined>;
  getAll(queryParams?: { filters?: VideoRepositoryFilters; pagination?: VideoPaginationParams }): Promise<DataVideo>;
  reactionByUser(videoId: string, userId: string): Promise<boolean | null>;
  removeReactionAndAddNew(videoId: string, userId: string, isLike: boolean): Promise<CreateReactionResponseDto | null>;
  addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null>;
  addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null>;
  getPopular(arg: GetPopularInputType): Promise<PopularVideoResponseDto>;
  getPopularLive(arg: GetPopularLiveInputType): Promise<PopularVideoResponseDto>;
  getPopularVideoLength(category: string): Promise<number>;
  commentReactionByUser(commentId: string, userId: string): Promise<boolean | null>;
  calculateCommentReaction(commentId: string): Promise<{ likeNum: number; dislikeNum: number }>;
  addCommentReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null>;
  removeCommentReactionAndAddNew(
    commentId: string,
    userId: string,
    isLike: boolean,
  ): Promise<CreateReactionResponseDto | null>;
  getVideosBySearch(queryParams: VideoSearch, additionalQueryParams?: VideoSearchFilters): Promise<DataVideo>;
  getRepliesForComment(commentId: string): Promise<Comment[]>;
  addVideoCommentReply(request: BaseReplyRequestDto, authorId: string): Promise<Comment[]>;
  getGeneralVideos(userId: string): Promise<DataVideo>;
  getRecommendedVideos(params: RecommendedVideosParams): Promise<DataVideo>;
}
