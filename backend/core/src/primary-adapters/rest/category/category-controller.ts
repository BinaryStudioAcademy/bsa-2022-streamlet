import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import {
  ApiPath,
  DefaultRequestParam,
  CategoryApiPath,
  CategorySearchRequestQueryDto,
  CategoryResponseDto,
  CategoryCreateRequestDto,
  CategoryGetAllDto,
  CategoryUpdateRequestDto,
  BaseVideoResponseDto,
  BindCategoryToVideoRequestDto,
} from 'shared/build';
import { NotFound } from '~/shared/exceptions/not-found';
import { CategoryService } from '~/core/category/application/category-service';
import { normalizeCategoryPayload } from './helpers/normalize-payload-helper';
import { normalizeCategoryFiltersPayload } from './helpers/normalize-category-filters-helper';
import { DuplicationError } from '~/shared/exceptions/duplication-error';
import { authenticationMiddleware } from '../middleware';
import { normalizeCategoryUpdatePayload } from './helpers/normalize-update-payload-helper';

/**
 * all routes except bind categories to video, get all and search
 * should be role based (role admin or something like that)
 */
@controller(ApiPath.CATEGORY, authenticationMiddleware)
export class CategoryController extends BaseHttpController {
  private categoryService: CategoryService;

  constructor(@inject(CONTAINER_TYPES.CategoryService) categoryService: CategoryService) {
    super();

    this.categoryService = categoryService;
  }

  @httpGet(CategoryApiPath.ROOT)
  public async getAll(@queryParam() { take, skip }: CategoryGetAllDto): Promise<CategoryResponseDto[]> {
    return this.categoryService.getAll({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
    });
  }

  @httpGet(CategoryApiPath.SEARCH)
  public async search(
    @queryParam() { take, skip, categories }: CategorySearchRequestQueryDto,
  ): Promise<BaseVideoResponseDto[]> {
    return this.categoryService.search({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      categories: normalizeCategoryFiltersPayload(categories),
    });
  }

  @httpGet(CategoryApiPath.$ID)
  public async getById(@requestParam() { id }: DefaultRequestParam): Promise<CategoryResponseDto> {
    const category = await this.categoryService.getById(id);
    if (!category) {
      throw new NotFound('Invalid category id');
    }

    return category;
  }

  @httpPost(CategoryApiPath.ROOT)
  public async createCategory(@requestBody() body: CategoryCreateRequestDto): Promise<CategoryResponseDto> {
    const payload = normalizeCategoryPayload(body);
    const category = await this.categoryService.createCategory(payload);
    if (!category) {
      throw new DuplicationError('This category already exists');
    }

    return category;
  }

  @httpPut(CategoryApiPath.$ID)
  public async updateCategory(
    @requestParam() { id }: DefaultRequestParam,
    @requestBody() body: Omit<CategoryUpdateRequestDto, 'id'>,
  ): Promise<CategoryResponseDto> {
    const payload = normalizeCategoryUpdatePayload(body);

    const updatedCategory = await this.categoryService.updateCategory({
      id,
      ...payload,
    });
    if (!updatedCategory) {
      throw new NotFound('Category not found');
    }

    return updatedCategory;
  }

  @httpDelete(CategoryApiPath.$ID)
  public async deleteCategory(@requestParam() { id }: DefaultRequestParam): Promise<boolean> {
    const isSuccess = await this.categoryService.deleteCategory(id);
    if (!isSuccess) {
      throw new NotFound('Category not found');
    }

    return isSuccess;
  }

  @httpPost(CategoryApiPath.$BIND)
  public async bindCategoryToVIdeo(
    @requestParam() { id }: DefaultRequestParam,
    @requestBody() { categories }: BindCategoryToVideoRequestDto,
  ): Promise<CategoryResponseDto[]> {
    const payload = categories.map((category) => normalizeCategoryPayload(category));

    const bindedCategories = await this.categoryService.bindCategories({
      categoryPayload: payload,
      videoId: id,
    });
    if (bindedCategories === null) {
      throw new NotFound('Video not found');
    }
    if (!bindedCategories) {
      throw new NotFound('Category not found');
    }

    return bindedCategories;
  }
}
