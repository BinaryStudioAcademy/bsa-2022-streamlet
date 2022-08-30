import { ContainerModule, interfaces } from 'inversify';
import { TagService } from './application/tag-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const tagContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<TagService>(CONTAINER_TYPES.TagService).to(TagService);
});

export { tagContainerModule };
