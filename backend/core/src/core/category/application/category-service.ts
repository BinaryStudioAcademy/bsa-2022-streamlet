import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';

import {
  SearchByCategoryResponseDto,
  CategoryCreateRequestDto,
  CategoryResponseDto,
  CategorySearchRequestQueryDto,
  BindCategoryToVideoDto,
} from 'shared/build';

import { VideoRepository } from '~/core/video/port/video-repository';
import { CategoryRepository } from '../port/category-repository';
import { castToCategoryResponseDto } from './dtos/cast-to-category-response-dto';
import { castToSearchByCategoryResponseDto } from './dtos/cast-to-search-response-dto';

@injectable()
export class CategoryService {
  private categoryRepository: CategoryRepository;
  private videoRepository: VideoRepository;

  constructor(
    @inject(CONTAINER_TYPES.CategoryRepository) categoryRepository: CategoryRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
  ) {
    this.categoryRepository = categoryRepository;
    this.videoRepository = videoRepository;
  }

  async getByName({ name }: CategoryCreateRequestDto): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.getByName(name);
    return category && castToCategoryResponseDto(category);
  }

  async getById(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.getById(id);
    return category && castToCategoryResponseDto(category);
  }

  async search(categorySearchRequestQueryDto: CategorySearchRequestQueryDto): Promise<SearchByCategoryResponseDto[]> {
    const videos = await this.videoRepository.searchByCatergories(categorySearchRequestQueryDto);

    return videos.map((video) => castToSearchByCategoryResponseDto(video));
  }

  async createCategory({ name }: CategoryCreateRequestDto): Promise<CategoryResponseDto | undefined> {
    const isTagCreated = await this.categoryRepository.getByName(name);
    if (isTagCreated) {
      return;
    }
    const category = await this.categoryRepository.createCategory({ name });
    return castToCategoryResponseDto(category);
  }

  async bindCategory({ name, videoId }: BindCategoryToVideoDto): Promise<CategoryResponseDto | undefined | null> {
    const isVideoExists = await this.videoRepository.getById(videoId);
    if (!isVideoExists) {
      return null;
    }
    const isCategoryExists = await this.getByName({ name });
    if (!isCategoryExists) {
      return;
    }
    const category = await this.categoryRepository.bindCategoryToVideo({ name, videoId });
    return castToCategoryResponseDto(category);
  }
}
