import { inject, injectable } from 'inversify';
import { PrismaClient, Tag } from '@prisma/client';
import { CONTAINER_TYPES, TagCreateRequestDto } from '~/shared/types/types';
import { TagRepository } from '~/core/tag/port/tag-repository';
import { BindTagToVideoDto } from 'shared/build';

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

  createTags(tagCreateDto: TagCreateRequestDto[]): Promise<Tag[]> {
    return this.prismaClient.$transaction(
      tagCreateDto.map((tag) =>
        this.prismaClient.tag.upsert({
          where: {
            name: tag.name,
          },
          update: {},
          create: tag,
        }),
      ),
    );
  }

  bindTagToVideo({ tags, videoId }: BindTagToVideoDto): Promise<Tag[]> {
    const values = tags.map((tagId) => {
      return `('${tagId}', '${videoId}')`;
    });
    const query = `insert into "_TagToVideo" ("A", "B") values ${values.join(',')} on conflict do nothing`;
    return this.prismaClient.$queryRawUnsafe(query).then(() => {
      return this.prismaClient.tag.findMany({
        where: {
          id: {
            in: tags,
          },
        },
      });
    });
  }
}
