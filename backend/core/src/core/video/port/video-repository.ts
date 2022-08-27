import {
  BaseVideoResponseDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';
import { Comment } from 'shared/build/common/types/comment';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

export interface VideoRepository {
  getAll(): Promise<DataVideo>;
  getById(
    id: string,
  ): Promise<
    (BaseVideoResponseDto & { comments: Comment[]; description: string; likeNum: number; dislikeNum: number }) | null
  >;
  reactionByUser(videoId: string, userId: string): Promise<boolean | null>;
  removeReactionAndAddNew(videoId: string, userId: string, isLike: boolean): Promise<CreateReactionResponseDto | null>;
  addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null>;
  addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null>;
}
