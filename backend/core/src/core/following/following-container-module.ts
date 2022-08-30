import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { FollowingService } from './application/following-service';

const followingContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<FollowingService>(CONTAINER_TYPES.HistoryService).to(FollowingService);
});

export { followingContainerModule };
