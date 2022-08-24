import { Video } from '@prisma/client';

export interface VideoRepository {
  searchByTags({ take, skip, tags }: { take?: number; skip?: number; tags: string[] }): Promise<Video[]>;
}
