import { type VideoBaseResponseDto } from '~/shared/types/types';
import { Video } from '@prisma/client';

export interface VideoRepository {
  getById(id: string): Promise<VideoBaseResponseDto | null>;
  getAll(): Promise<Video[]>;
}
