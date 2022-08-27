import { BaseHttpController, controller, httpGet, request, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedRequest } from '~/shared/types/types';
import { VideoService } from '~/core/video/application/video-service';
import { ApiPath, VideoExpandedResponseDto } from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { NotFound } from '~/shared/exceptions/not-found';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';

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
@controller(ApiPath.VIDEOS)
export class VideoController extends BaseHttpController {
  private videoService: VideoService;

  constructor(
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
    @inject(CONTAINER_TYPES.ChannelSubscriptionRepository)
    private channelSubscriptionRepository: ChannelSubscriptionRepository,
  ) {
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
  public getAllVideos(): Promise<DataVideo> {
    return this.videoService.getAllVideos();
  }

  @httpGet('/:id', optionalAuthenticationMiddleware)
  public async get(@requestParam('id') id: string, @request() req: ExtendedRequest): Promise<VideoExpandedResponseDto> {
    const video = await this.videoService.getById(id);

    if (!video) {
      throw new NotFound('Such video doesn`t exist');
    }
    const { user } = req;
    let isSubscribed: boolean;
    if (user) {
      isSubscribed = await this.channelSubscriptionRepository.isUserSubscribed(video.channel.id, user.id);
    } else {
      isSubscribed = false;
    }
    return { ...video, isUserSubscribedOnChannel: isSubscribed };
  }
}
