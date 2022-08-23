import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { VideoService } from '~/core/video/application/video-service';
import { Video } from '@prisma/client';

/**
 * @swagger
 * tags:
 *   name: videos
 *   description: Videos management
 * components:
 *    schemas:
 *      Channel:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          avatar:
 *            type: string
 *      Video:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            format: uuid
 *          name:
 *            type: string
 *          status:
 *            type: string
 *          publishedAt:
 *            type: string
 *            format: date-time
 *          scheduledStreamDate:
 *            type: string
 *            format: date-time
 *          poster:
 *            type: string
 *          duration:
 *            type: integer
 *            format: int32
 *            minimum: 0
 *          videoViews:
 *            type: integer
 *            format: int64
 *            minimum: 0
 *          liveViews:
 *            type: integer
 *            format: int64
 *            minimum: 0
 *          channel:
 *            $ref: '#/components/schemas/Channel'
 */
@controller('/videos')
export class VideoController extends BaseHttpController {
  private videoService: VideoService;

  constructor(@inject(CONTAINER_TYPES.VideoService) videoService: VideoService) {
    super();

    this.videoService = videoService;
  }

  /**
   * @swagger
   * /videos:
   *    get:
   *      tags:
   *      - videos
   *      operationId: getAllVideos
   *      description: Returns an array of videos
   *      security: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Video'
   */
  @httpGet('/')
  public getAllVideos(): Promise<Video[]> {
    return this.videoService.getAllVideos();
  }
}
