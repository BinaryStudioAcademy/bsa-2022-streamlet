import { ContainerModule, interfaces } from 'inversify';
import { VideoService } from './application/video-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const videoContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<VideoService>(CONTAINER_TYPES.VideoService).to(VideoService);
});

export { videoContainerModule };
