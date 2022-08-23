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

  createTag(tagCreateDto: TagCreateRequestDto): Promise<Tag> {
    return this.prismaClient.tag.create({
      data: tagCreateDto,
    });
  }
}
