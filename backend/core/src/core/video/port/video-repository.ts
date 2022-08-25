import { Video } from '@prisma/client';
import { CategorySearchRequestQueryDto, TagSearchRequestQueryDto } from 'shared/build';

export interface VideoRepository {
  getById(id: string): Promise<Video | null>;
  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<Video[]>;
  searchByCatergories(searchByCategoryDto: CategorySearchRequestQueryDto): Promise<Video[]>;
}
