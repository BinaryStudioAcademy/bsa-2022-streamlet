import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

import { TagCreateRequestDto, TagResponseDto } from 'shared/build';

import { TagRepository } from '~/core/tag/port/tag-repository';
import { castToTagResponseDto } from './dtos/cast-to-tag-response-dto';

@injectable()
export class TagService {
  private tagRepository: TagRepository;

  constructor(@inject(CONTAINER_TYPES.TagRepository) tagRepository: TagRepository) {
    this.tagRepository = tagRepository;
  }

  async getByName({ name }: TagCreateRequestDto): Promise<TagResponseDto | null> {
    const tag = await this.tagRepository.getByName(name);
    return tag && castToTagResponseDto(tag);
  }

  async getById(id: string): Promise<TagResponseDto | null> {
    const tag = await this.tagRepository.getById(id);
    return tag && castToTagResponseDto(tag);
  }

  async createTag(createTagDto: TagCreateRequestDto): Promise<TagResponseDto> {
    const createdTag = await this.tagRepository.createTag(createTagDto);
    return castToTagResponseDto(createdTag);
  }
}
