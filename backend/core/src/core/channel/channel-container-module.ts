import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelService } from './application/channel-service';

const channelContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelService>(CONTAINER_TYPES.ChannelService).to(ChannelService);
});

export { channelContainerModule };
