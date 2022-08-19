import { CreateReactionRequestDto, CreateReactionResponseDto, type VideoBaseResponseDto } from '~/shared/types/types';
import { Video } from '@prisma/client';

export interface VideoRepository {
  getById(
    id: string,
    userId: string | undefined,
    isUserSubscribeOnVideoChannel: boolean,
  ): Promise<VideoBaseResponseDto | null>;
  getAll(): Promise<Video[]>;
  addReaction(request: CreateReactionRequestDto, videoId: string): Promise<CreateReactionResponseDto | null>;
}
