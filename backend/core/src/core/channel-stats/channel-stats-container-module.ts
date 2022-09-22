import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStatsService } from './application/channel-stats-service';

const channelStatsContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelStatsService>(CONTAINER_TYPES.ChannelStatsService).to(ChannelStatsService);
});

export { channelStatsContainerModule };
