import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { HttpError, VideoBaseResponseDto } from 'shared/build';
import { VideoService } from '~/core/video/aplication/video-service';
import { Video } from '@prisma/client';

/**
 * @swagger
 * tags:
 *   name: video
 *   description: Video management
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *          isActivated:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 */
@controller('/videos')
export class VideoController extends BaseHttpController {
  private videoService: VideoService;

  constructor(@inject(CONTAINER_TYPES.VideoService) videoService: VideoService) {
    super();

    this.videoService = videoService;
  }

  @httpGet('/get/:id')
  public async get(@requestParam('id') id: string): Promise<VideoBaseResponseDto> {
    const video = await this.videoService.getById(id);

    if (!video) {
      throw new HttpError({ message: 'video dont found', status: 404 });
    }

    return video;
  }
  @httpGet('/get')
  public async getAll(): Promise<Video[]> {
    return this.videoService.getAll();
  }
}
