import { Video } from '@prisma/client';

export interface VideoRepository {
  getAll(): Promise<Video[]>;
}
