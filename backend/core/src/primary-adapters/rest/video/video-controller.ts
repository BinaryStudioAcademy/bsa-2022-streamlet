import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest, ExtendedRequest } from '~/shared/types/types';
import { VideoService } from '~/core/video/application/video-service';
import {
  ApiPath,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoApiPath,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoExpandedResponseDto,
} from 'shared/build';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { NotFound } from '~/shared/exceptions/not-found';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';
import { VideoRepository } from '~/core/video/port/video-repository';
import { authenticationMiddleware } from '../middleware';

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
    @inject(CONTAINER_TYPES.VideoRepository) private videoRepository: VideoRepository,
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

  @httpGet(`${VideoApiPath.$ID}`, optionalAuthenticationMiddleware)
  public async get(@requestParam('id') id: string, @request() req: ExtendedRequest): Promise<VideoExpandedResponseDto> {
    const video = await this.videoService.getById(id);

    if (!video) {
      throw new NotFound('Such video doesn`t exist');
    }
    const { user } = req;
    let isSubscribed = false;
    let userReaction: boolean | null = null;
    if (user) {
      isSubscribed = await this.channelSubscriptionRepository.isUserSubscribed(video.channel.id, user.id);
      userReaction = await this.videoRepository.reactionByUser(video.id, user.id);
    }
    return {
      ...video,
      isUserSubscribedOnChannel: isSubscribed,
      userReaction: userReaction !== null ? { isLike: userReaction } : null,
    };
  }
  /**
   * @swagger
   * /comment:
   *    post:
   *      tags:
   *        - video
   *      operationId: addVideoComment
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add comment to video
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data that contain isLike filed
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/CreateReactionRequestDto'
   *        - in: path
   *          name: id
   *          description: video ID
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: reaction added
   *        '404':
   *          description: video does not exist
   */

  @httpPost(`${VideoApiPath.REACTION}${VideoApiPath.$ID}`, authenticationMiddleware)
  public async addReaction(
    @requestParam('id') id: string,
    @requestBody() body: CreateReactionRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateReactionResponseDto> {
    const { id: userId } = req.user;

    const reactionResponse = await this.videoService.addReaction(body, id, userId);

    if (!reactionResponse) {
      throw new NotFound('video does not exist');
    }

    return reactionResponse;
  }

  /**
   * @swagger
   * /comment:
   *    post:
   *      tags:
   *        - video
   *      operationId: addVideoComment
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Add comment to video
   *      parameters:
   *        - in: body
   *          name: body
   *          description: data that contain comment text and video id
   *          required: true
   *          schema:
   *            $ref: '#/components/schemas/VideoCommentRequestDto'
   *      responses:
   *        '200':
   *          description: comment added
   *        '404':
   *          description: video does not exist
   */

  @httpPost(VideoApiPath.COMMENT, authenticationMiddleware)
  public async addComment(
    @requestBody() body: VideoCommentRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoCommentResponseDto> {
    const { id: userId } = req.user;

    const res = await this.videoService.addComment(body, userId);

    if (!res) {
      throw new NotFound('Video does not exist');
    }

    return res;
  }
}
