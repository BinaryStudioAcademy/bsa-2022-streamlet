import { ContainerModule, interfaces } from 'inversify';
import { CategoryService } from './application/category-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const categoryContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CategoryService>(CONTAINER_TYPES.CategoryService).to(CategoryService);
});

export { categoryContainerModule };
