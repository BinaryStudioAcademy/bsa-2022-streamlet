import { CategorySearchRequestQueryDto } from './category-search-request-query-dto';

export type CategoryGetAllDto = Omit<CategorySearchRequestQueryDto, 'categories'>;
