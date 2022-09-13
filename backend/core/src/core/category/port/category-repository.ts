import { Category } from '@prisma/client';
import { BindCategoryToVideoDto, CategoryCreateDto, CategoryGetAllDto, CategoryUpdateDto } from 'shared/build';

export interface CategoryRepository {
  getById(id: string): Promise<Category | null>;
  getAll({ take, skip }: CategoryGetAllDto): Promise<Category[]>;
  getByName(name: string): Promise<Category | null>;
  updateCategory(updateCategoryDto: CategoryUpdateDto): Promise<Category | undefined>;
  createCategory(createCategoryDto: CategoryCreateDto): Promise<Category>;
  deleteCategory(id: string): Promise<boolean>;
  bindCategoriesToVideo(bindCategoryToVideoDto: BindCategoryToVideoDto): Promise<Category[]>;
  clearCategoriesToVideoBinding(videoId: string): Promise<void>;
}
