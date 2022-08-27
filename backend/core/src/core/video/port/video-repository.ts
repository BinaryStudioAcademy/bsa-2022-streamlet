import { Video } from '@prisma/client';
import { CategorySearchRequestQueryDto, TagSearchRequestQueryDto } from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';

export interface VideoRepository {
  getById(id: string): Promise<Video | null>;
  searchByTags(searchByTagsDto: TagSearchRequestQueryDto): Promise<VideoWithChannel[]>;
  searchByCatergories(searchByCategoryDto: CategorySearchRequestQueryDto): Promise<VideoWithChannel[]>;
  getAll(): Promise<DataVideo>;
}
