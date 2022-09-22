import { TagRepository } from '../../../../src/core/tag/port/tag-repository';
import { Tag } from '@prisma/client';
import { BindTagToVideoDto, TagCreateRequestDto } from 'shared/build';
import tags from './data/tags.json';

export class TestTagRepositoryAdapter implements TagRepository {
  bindTagToVideo(bindTagToVideoDto: BindTagToVideoDto): Promise<Tag[]> {
    // only for ignoring eslint errors
    if (!bindTagToVideoDto) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  }

  createTags(createTagsDto: TagCreateRequestDto[]): Promise<Tag[]> {
    // only for ignoring eslint errors
    if (!createTagsDto) {
      return Promise.resolve([]);
    }

    return Promise.resolve([]);
  }

  getById(id: string): Promise<Tag | null> {
    const tag = tags.find((sampleTag) => sampleTag.id === id);

    if (!tag) {
      return Promise.resolve(null);
    }

    return Promise.resolve({
      ...tag,
      createdAt: new Date(tag.createdAt),
      updatedAt: new Date(tag.updatedAt),
    });
  }

  getByName(name: string): Promise<Tag | null> {
    // only for ignoring eslint errors
    if (!name) {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  }

  clearTagToVideoBinding(videoId: string): Promise<void> {
    // only for ignoring eslint errors
    if (!videoId) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(undefined);
  }
}
