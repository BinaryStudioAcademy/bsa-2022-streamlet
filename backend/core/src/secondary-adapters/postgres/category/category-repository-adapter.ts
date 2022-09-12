import { inject, injectable } from 'inversify';
import { Category, PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { CategoryRepository } from '~/core/category/port/category-repository';
import { BindCategoryToVideoDto, CategoryCreateDto, CategoryGetAllDto, CategoryUpdateDto } from 'shared/build';

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

  getAll({ take, skip }: CategoryGetAllDto): Promise<Category[]> {
    return this.prismaClient.category.findMany({
      take,
      skip,
    });
  }

  getByName(name: string): Promise<Category | null> {
    return this.prismaClient.category.findFirst({
      where: {
        name,
      },
    });
  }

  updateCategory({ id, name, posterPath }: CategoryUpdateDto): Promise<Category | undefined> {
    return this.prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name,
        posterPath,
      },
    });
  }

  createCategory(categoryCreateDto: CategoryCreateDto): Promise<Category> {
    return this.prismaClient.category.create({
      data: categoryCreateDto,
    });
  }

  deleteCategory(id: string): Promise<boolean> {
    return this.prismaClient.category
      .delete({
        where: {
          id,
        },
      })
      .then((category) => !!category);
  }

  async bindCategoriesToVideo({ categories, videoId }: BindCategoryToVideoDto): Promise<Category[]> {
    await this.prismaClient.$transaction(
      categories.map((categoryId) => {
        return this.prismaClient.categoryToVideo.upsert({
          where: {
            categoryId_videoId: {
              videoId,
              categoryId,
            },
          },
          update: {},
          create: {
            videoId,
            categoryId,
          },
        });
      }),
    );

    return this.prismaClient.category.findMany({
      where: {
        id: {
          in: categories,
        },
      },
    });
  }
}
