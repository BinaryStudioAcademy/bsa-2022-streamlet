import { inject, injectable } from 'inversify';
import { PrismaClient, Tag } from '@prisma/client';
import { CONTAINER_TYPES, TagCreateRequestDto } from '~/shared/types/types';
import { TagRepository } from '~/core/tag/port/tag-repository';

@injectable()
export class TagRepositoryAdapter implements TagRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getById(id: string): Promise<Tag | null> {
    return this.prismaClient.tag.findFirst({
      where: {
        id,
      },
    });
  }

  getByName(name: string): Promise<Tag | null> {
    return this.prismaClient.tag.findFirst({
      where: {
        name,
      },
    });
  }

  createTag(tagCreateDto: TagCreateRequestDto): Promise<Tag> {
    return this.prismaClient.tag.create({
      data: tagCreateDto,
    });
  }

  bindTagToVideo({ name, videoId }: { name: string; videoId: string }): Promise<Tag> {
    return this.prismaClient.tag.update({
      where: {
        name,
      },
      data: {
        videos: {
          connect: {
            id: videoId,
          },
        },
      },
    });
  }
}
