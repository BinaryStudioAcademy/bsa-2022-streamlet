import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

import {
  CategoryCreateRequestDto,
  CategoryResponseDto,
  CategorySearchRequestQueryDto,
  CategoryGetAllDto,
  ImageStorePresetType,
  ImageUploadResponseDto,
  CategoryUpdateRequestDto,
  BaseVideoResponseDto,
  CategoryCreateDto,
} from 'shared/build';

import { VideoRepository } from '~/core/video/port/video-repository';
import { CategoryRepository } from '../port/category-repository';
import { castToCategoryResponseDto } from './dtos/cast-to-category-response-dto';
import { castToSearchByCategoryResponseDto } from './dtos/cast-to-search-response-dto';
import { ImageStorePort } from '~/core/common/port/image-store';

@injectable()
export class CategoryService {
  private categoryRepository: CategoryRepository;
  private videoRepository: VideoRepository;
  private imageStore: ImageStorePort;

  constructor(
    @inject(CONTAINER_TYPES.CategoryRepository) categoryRepository: CategoryRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
  ) {
    this.categoryRepository = categoryRepository;
    this.videoRepository = videoRepository;
    this.imageStore = imageStore;
  }

  async getByName({ name }: CategoryCreateRequestDto): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.getByName(name);
    return category && castToCategoryResponseDto(category);
  }

  async getById(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.getById(id);
    return category && castToCategoryResponseDto(category);
  }

  async getAll({ skip, take }: CategoryGetAllDto): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.getAll({ take, skip });

    return categories.map((category) => castToCategoryResponseDto(category));
  }

  async search(categorySearchRequestQueryDto: CategorySearchRequestQueryDto): Promise<BaseVideoResponseDto[]> {
    const videos = await this.videoRepository.searchByCategories(categorySearchRequestQueryDto);
    return videos.map((video) => castToSearchByCategoryResponseDto(video));
  }

  async updateCategory(
    { id, name, posterBase64Str }: CategoryUpdateRequestDto,
    userId: string,
  ): Promise<CategoryResponseDto | undefined> {
    let posterPath: ImageUploadResponseDto | undefined;
    if (posterBase64Str) {
      posterPath = await this.imageStore.upload({
        base64Str: posterBase64Str,
        type: ImageStorePresetType.CATEGORY_POSTER,
        userId,
      });
    }
    const category = await this.categoryRepository.updateCategory({
      id,
      name,
      posterPath: posterPath?.url ?? '',
    });
    if (!category) {
      return;
    }

    return castToCategoryResponseDto(category);
  }

  async createCategory(
    { name, posterBase64Str }: CategoryCreateRequestDto,
    userId: string,
  ): Promise<CategoryResponseDto | undefined> {
    const isCategoryCreated = await this.categoryRepository.getByName(name);
    if (isCategoryCreated) {
      return;
    }
    let posterPath: ImageUploadResponseDto | undefined;
    if (posterBase64Str) {
      posterPath = await this.imageStore.upload({
        base64Str: posterBase64Str,
        type: ImageStorePresetType.CATEGORY_POSTER,
        userId,
      });
    }
    const category = await this.categoryRepository.createCategory({
      name,
      posterPath: posterPath?.url ?? '',
    });
    return castToCategoryResponseDto(category);
  }

  deleteCategory(id: string): Promise<boolean> {
    return this.categoryRepository.deleteCategory(id);
  }

  async bindCategories({
    categoryPayload,
    videoId,
  }: {
    categoryPayload: Omit<CategoryCreateDto, 'posterPath'>[];
    videoId: string;
  }): Promise<CategoryResponseDto[] | undefined | null> {
    const isVideoExists = await this.videoRepository.getById(videoId);
    if (!isVideoExists) {
      return null;
    }
    await this.categoryRepository.clearCategoriesToVideoBinding(videoId);
    const categories: string[] = [];
    for (const { name } of categoryPayload) {
      const category = await this.categoryRepository.getByName(name);
      if (!category) {
        return;
      }
      categories.push(category.id);
    }

    const bindedCategories = await this.categoryRepository.bindCategoriesToVideo({
      categories,
      videoId,
    });
    return bindedCategories.map((category) => castToCategoryResponseDto(category));
  }
}
