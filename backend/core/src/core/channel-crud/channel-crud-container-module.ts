import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelCrudService } from './application/channel-crud-service';

const channelCrudContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelCrudService>(CONTAINER_TYPES.ChannelCrudService).to(ChannelCrudService);
});

export { channelCrudContainerModule };
