import { Video } from '@prisma/client';
import { CategorySearchRequestQueryDto, TagSearchRequestQueryDto } from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

export interface VideoRepository {
  getById(id: string): Promise<Video | null>;
  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<Video[]>;
  searchByCatergories(searchByCategoryDto: CategorySearchRequestQueryDto): Promise<Video[]>;
  getAll(): Promise<DataVideo>;
}
