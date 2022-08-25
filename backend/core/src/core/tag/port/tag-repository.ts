import { Tag } from '@prisma/client';
import { BindTagToVideoDto } from 'shared/build';
import { TagCreateRequestDto } from '~/shared/types/types';
export interface TagRepository {
  getById(id: string): Promise<Tag | null>;
  getByName(name: string): Promise<Tag | null>;
  createTag(createTagDto: TagCreateRequestDto): Promise<Tag>;
  bindTagToVideo(bindTagToVideoDto: BindTagToVideoDto): Promise<Tag>;
}
