import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStreamingService } from './application/channel-streaming-service';

const channelStreamingContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelStreamingService>(CONTAINER_TYPES.ChannelStreamingService).to(ChannelStreamingService);
});

export { channelStreamingContainerModule };
