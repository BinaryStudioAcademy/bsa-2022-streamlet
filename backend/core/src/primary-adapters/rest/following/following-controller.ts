import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, request } from 'inversify-express-utils';
import { FollowingService } from '~/core/following/application/following-service';
import { ApiPath, FollowingApiPath } from '~/shared/enums/api/api';
import {
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
  VideosLiveResponseDto,
  VideosOfflineResponseDto,
} from '~/shared/types/types';
import { authenticationMiddleware } from '../middleware';

/**
 * @swagger
 * tags:
 *   name: Following
 *   description: Info related to videos from the chnnales the current user is following
 * components:
 *    schemas:
 *      VideosOfflineResponseDto:
 *        type: object
 *        properties:
 *          videos:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/BaseVideoResponseDto'
 *      VideosLiveResponseDto:
 *        type: object
 *        properties:
 *          videos:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/BaseVideoResponseDto'
 *      BaseVideoResponseDto:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          status:
 *            type: string
 *          publishedAt:
 *            type: string
 *          scheduledStreamDate:
 *            type: string
 *          poster:
 *            type: string
 *          duration:
 *            type: number
 *          videoViews:
 *            type: number
 *          liveViews:
 *            type: number
 *          channel:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              avatar:
 *                type: string
 */
@controller(ApiPath.FOLLOWING)
export class FollowingController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.FollowingService) private followingService: FollowingService) {
    super();
  }

  // TODO: pagination

  /**
   * @swagger
   * /following/videos/offline:
   *    post:
   *      tags:
   *        - following
   *      operationId: followingVideosOffline
   *      security:
   *        - bearerAuth: []
   *      produces:
   *        - application/json
   *      description: returns all videos that are not live from the channels subscribed by the authenticated user
   *      responses:
   *        '200':
   *          description: successful operation
   *        '401':
   *          description: user is not authenticated
   */
  @httpGet(FollowingApiPath.VIDEOS_OFFLINE, authenticationMiddleware)
  public async videosOffline(@request() req: ExtendedAuthenticatedRequest): Promise<VideosOfflineResponseDto> {
    return { videos: await this.followingService.getOfflineVideos(req.user.id) };
  }

  // TODO: pagination

  /**
   * @swagger
   * /following/videos/live:
   *    post:
   *      tags:
   *        - following
   *      operationId: followingVideosLive
   *      security:
   *        - bearerAuth: []
   *      produces:
   *        - application/json
   *      description: returns only live videos from the channels subscribed by the authenticated user
   *      responses:
   *        '200':
   *          description: successful operation
   *        '401':
   *          description: user is not authenticated
   */
  @httpGet(FollowingApiPath.VIDEOS_LIVE, authenticationMiddleware)
  public async videosLive(@request() req: ExtendedAuthenticatedRequest): Promise<VideosLiveResponseDto> {
    return { videos: await this.followingService.getLiveVideos(req.user.id) };
  }
}
