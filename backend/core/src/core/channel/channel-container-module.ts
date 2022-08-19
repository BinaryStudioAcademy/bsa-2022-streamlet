import { ContainerModule, interfaces } from 'inversify';
import { ChannelService } from './application/channel-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const channelContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelService>(CONTAINER_TYPES.ChannelService).to(ChannelService);
});

export { channelContainerModule };
