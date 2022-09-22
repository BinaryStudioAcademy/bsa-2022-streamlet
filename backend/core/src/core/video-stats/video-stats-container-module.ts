import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { VideoStatsService } from './application/video-stats-service';

const videoStatsContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<VideoStatsService>(CONTAINER_TYPES.VideoStatsService).to(VideoStatsService);
});

export { videoStatsContainerModule };
