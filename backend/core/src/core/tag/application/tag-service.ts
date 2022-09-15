import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

import { BaseVideoResponseDto, TagCreateRequestDto, TagResponseDto, TagSearchRequestQueryDto } from 'shared/build';

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

  async search({ take, skip, tags }: TagSearchRequestQueryDto): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.searchByTags({ take, skip, tags });

    return videos.map((video) => castToSearchByTagResponseDto(video));
  }

  async createTags(payload: TagCreateRequestDto[]): Promise<TagResponseDto[]> {
    return (await this.tagRepository.createTags(payload)).map((tag) => castToTagResponseDto(tag));
  }

  async bindTags({
    tagPayload,
    videoId,
  }: {
    tagPayload: TagCreateRequestDto[];
    videoId: string;
  }): Promise<TagResponseDto[] | null> {
    const isVideoExists = await this.videoRepository.getById(videoId);
    if (!isVideoExists) {
      return null;
    }
    await this.tagRepository.clearTagToVideoBinding(videoId);
    const createdTags = await this.createTags(tagPayload);
    const tags = await this.tagRepository.bindTagToVideo({
      tags: createdTags.map((tag) => tag.id),
      videoId,
    });
    return tags.map((tag) => castToTagResponseDto(tag));
  }
}
