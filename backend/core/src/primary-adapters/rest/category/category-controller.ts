import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
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
  SearchByCategoryResponseDto,
  CategoryResponseDto,
  CategoryCreateRequestDto,
} from 'shared/build';
import { NotFound } from '~/shared/exceptions/not-found';
import { CategoryService } from '~/core/category/application/category-service';
import { normalizeCategoryPayload } from './helpers/normalize-payload-helper';
import { normalizeCategoryFiltersPayload } from './helpers/normalize-category-filters-helper';
import { DuplicationError } from '~/shared/exceptions/duplication-error';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.CATEGORY, authenticationMiddleware)
export class CategoryController extends BaseHttpController {
  private categoryService: CategoryService;

  constructor(@inject(CONTAINER_TYPES.CategoryService) categoryService: CategoryService) {
    super();

    this.categoryService = categoryService;
  }

  @httpGet(CategoryApiPath.SEARCH)
  public async search(
    @queryParam() { take, skip, categories }: CategorySearchRequestQueryDto,
  ): Promise<SearchByCategoryResponseDto[]> {
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

  @httpPost(CategoryApiPath.$BIND)
  public async bindCategoryToVIdeo(
    @requestParam() { id }: DefaultRequestParam,
    @requestBody() body: CategoryCreateRequestDto,
  ): Promise<CategoryResponseDto | undefined> {
    const payload = normalizeCategoryPayload(body);

    const category = await this.categoryService.bindCategory({
      ...payload,
      videoId: id,
    });
    if (category === null) {
      throw new NotFound('Video not found');
    }
    if (!category) {
      throw new NotFound('Category not found');
    }

    return category;
  }
}
