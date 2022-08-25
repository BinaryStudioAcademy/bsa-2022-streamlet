import { inject, injectable } from 'inversify';
import { Category, PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES, TagCreateRequestDto } from '~/shared/types/types';
import { CategoryRepository } from '~/core/category/port/category-repository';

@injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getById(id: string): Promise<Category | null> {
    return this.prismaClient.category.findFirst({
      where: {
        id,
      },
    });
  }

  getByName(name: string): Promise<Category | null> {
    return this.prismaClient.category.findFirst({
      where: {
        name,
      },
    });
  }

  search({ take, categories }: { take: number; categories: string[] }): Promise<Video[]> {
    return this.prismaClient.video.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: categories,
            },
          },
        },
      },
      take,
      include: {
        categories: true,
      },
    });
  }

  createCategory(tagCreateDto: TagCreateRequestDto): Promise<Category> {
    return this.prismaClient.category.create({
      data: tagCreateDto,
    });
  }

  bindCategoryToVideo({ name, videoId }: { name: string; videoId: string }): Promise<Category> {
    return this.prismaClient.category.update({
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
