import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { VideoService } from '~/core/video/application/video-service';
import { Video } from '@prisma/client';

//add swagger!
@controller('/videos')
export class VideoController extends BaseHttpController {
  private videoService: VideoService;

  constructor(@inject(CONTAINER_TYPES.VideoService) videoService: VideoService) {
    super();

    this.videoService = videoService;
  }

  @httpGet('/')
  public getAllUsers(): Promise<Video[]> {
    return this.videoService.getAllVideos();
  }
}
