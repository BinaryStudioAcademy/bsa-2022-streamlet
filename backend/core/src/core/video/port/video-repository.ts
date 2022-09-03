import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  CategorySearchRequestQueryDto,
  TagSearchRequestQueryDto,
  Comment,
  PopularVideosRequestDtoType,
  PopularVideoResponseDto,
  BaseReplyRequestDto,
} from 'shared/build';
import { BaseVideoResponseDto, DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';
import { VideoRepositoryFilters } from './video-repository-filters';
import { VideoSearch } from '~/shared/types/types';

export interface VideoRepository {
  getById(id: string): Promise<
    | (BaseVideoResponseDto & {
        comments: Comment[];
        description: string;
        likeNum: number;
        dislikeNum: number;
        videoPath: string;
      })
    | null
  >;
  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<VideoWithChannel[]>;
  searchByCatergories(searchByCategoryDto: CategorySearchRequestQueryDto): Promise<VideoWithChannel[]>;
  getAll(queryParams?: { filters?: VideoRepositoryFilters }): Promise<DataVideo>;
  reactionByUser(videoId: string, userId: string): Promise<boolean | null>;
  removeReactionAndAddNew(videoId: string, userId: string, isLike: boolean): Promise<CreateReactionResponseDto | null>;
  addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null>;
  addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null>;
  getPopular(
    request: PopularVideosRequestDtoType,
    take: number,
    skip: number,
    lastPage: number,
  ): Promise<PopularVideoResponseDto>;
  getPopularLive(
    request: PopularVideosRequestDtoType,
    take: number,
    skip: number,
    lastPage: number,
  ): Promise<PopularVideoResponseDto>;
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
  getVideosBySearch(queryParams: VideoSearch): Promise<DataVideo>;
  getRepliesForComment(commentId: string): Promise<Comment[]>;
  addVideoCommentReply(request: BaseReplyRequestDto, authorId: string): Promise<Comment[]>;
}
