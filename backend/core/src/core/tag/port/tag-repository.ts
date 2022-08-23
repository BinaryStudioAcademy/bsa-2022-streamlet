import { Tag } from '@prisma/client';
import { TagCreateRequestDto } from '~/shared/types/types';
export interface TagRepository {
  getById(id: string): Promise<Tag | null>;
  createTag(createTagDto: TagCreateRequestDto): Promise<Tag>;
}
