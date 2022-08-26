import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { Reaction } from '@prisma/client';
import {
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';

export interface VideoRepository {
  getAll(): Promise<DataVideo>;
  getById(
    id: string,
    userId: string | undefined,
    isUserSubscribeOnVideoChannel: boolean,
  ): Promise<VideoBaseResponseDto | null>;
  hasUserReacted(userId: string, videoId: string): Promise<Reaction[] | undefined>;
  removeReactionAndAddNew(
    videoId: string,
    userId: string,
    isLike: boolean,
    userReaction: Reaction,
  ): Promise<CreateReactionResponseDto | null>;
  addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null>;
  addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null>;
}
