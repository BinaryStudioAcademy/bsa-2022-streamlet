import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

import { SearchByTagResponseDto, TagCreateRequestDto, TagResponseDto } from 'shared/build';

import { TagRepository } from '~/core/tag/port/tag-repository';
import { castToTagResponseDto } from './dtos/cast-to-tag-response-dto';
import { VideoRepository } from '~/core/video/port/video-repository';
import { castToSearchByTagResponseDto } from './dtos/cast-to-search-response-dto';

@injectable()
export class TagService {
  private tagRepository: TagRepository;
  private videoRepository: VideoRepository;

  constructor(
    @inject(CONTAINER_TYPES.TagRepository) tagRepository: TagRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
  ) {
    this.tagRepository = tagRepository;
    this.videoRepository = videoRepository;
  }

  async getByName({ name }: TagCreateRequestDto): Promise<TagResponseDto | null> {
    const tag = await this.tagRepository.getByName(name);
    return tag && castToTagResponseDto(tag);
  }

  async getById(id: string): Promise<TagResponseDto | null> {
    const tag = await this.tagRepository.getById(id);
    return tag && castToTagResponseDto(tag);
  }

  async search({
    take,
    skip,
    tags,
  }: {
    take: number | undefined;
    skip: number | undefined;
    tags: string[];
  }): Promise<SearchByTagResponseDto[]> {
    const videos = await this.videoRepository.searchByTags({ take, skip, tags });

    return videos.map((video) => castToSearchByTagResponseDto(video));
  }

  async createTag({ name }: TagCreateRequestDto): Promise<TagResponseDto | undefined> {
    const isTagCreated = await this.tagRepository.getByName(name);
    if (isTagCreated) {
      return;
    }
    return this.tagRepository.createTag({ name });
  }

  async bindTag({ name, videoId }: { name: string; videoId: string }): Promise<TagResponseDto> {
    await this.createTag({ name });
    const tag = await this.tagRepository.bindTagToVideo({ name, videoId });
    return castToTagResponseDto(tag);
  }
}
