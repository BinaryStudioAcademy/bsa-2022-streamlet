import { Category } from '@prisma/client';
import { BindCategoryToVideoDto, CategoryCreateRequestDto, CategoryGetAllDto } from 'shared/build';

export interface CategoryRepository {
  getById(id: string): Promise<Category | null>;
  getAll({ take, skip }: CategoryGetAllDto): Promise<Category[]>;
  getByName(name: string): Promise<Category | null>;
  createCategory(createCategoryDto: CategoryCreateRequestDto): Promise<Category>;
  bindCategoryToVideo(bindCategoryToVideoDto: BindCategoryToVideoDto): Promise<Category>;
}
