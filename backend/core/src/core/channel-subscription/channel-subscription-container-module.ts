import { ContainerModule, interfaces } from 'inversify';
import { ChannelSubscriptionService } from './application/channel-subscription-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const channelSubscriptionContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelSubscriptionService>(CONTAINER_TYPES.ChannelSubscriptionService).to(ChannelSubscriptionService);
});

export { channelSubscriptionContainerModule };
