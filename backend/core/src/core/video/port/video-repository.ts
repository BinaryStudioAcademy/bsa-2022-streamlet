import { CreateReactionRequestDto, CreateReactionResponseDto, type VideoBaseResponseDto } from '~/shared/types/types';
import { Reaction, Video } from '@prisma/client';

export interface VideoRepository {
  getById(
    id: string,
    userId: string | undefined,
    isUserSubscribeOnVideoChannel: boolean,
  ): Promise<VideoBaseResponseDto | null>;
  getAll(): Promise<Video[]>;
  isUserReacted(userId: string, videoId: string): Promise<Reaction[] | undefined>;
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
}
