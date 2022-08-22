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
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  ExtendedAuthenticatedRequest,
  ExtendedRequest,
  VideoCommentResponseDto,
} from '~/shared/types/types';
import { VideoApiPath, VideoBaseResponseDto, VideoCommentRequestDto } from 'shared/build';
import { VideoService } from '~/core/video/aplication/video-service';
import { Video } from '@prisma/client';
import { authenticationMiddleware } from '~/primary-adapters/rest/middleware';
import { optionalAuthenticationMiddleware } from '~/primary-adapters/rest/middleware/optional-auth-middleware';
import { NotFound } from '~/shared/exceptions/not-found';

/**
 * @swagger
 * tags:
 *   name: video
 *   description: video
 * components:
 *    schemas:
 *      CreateReactionRequestDto:
 *        type: object
 *        properties:
 *          isLike:
 *            type: boolean
 *        required:
 *          - isLike
 *      VideoCommentRequestDto:
 *        type: object
 *        properties:
 *          videoId:
 *            type: string
 *          text:
 *            type: string
 *        required:
 *          - videoId
 *          - text
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
   * /videos/{id}:
   *    get:
   *      tags:
   *        - video
   *      operationId: getVideoById
   *      security:
   *      - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: Get video data by video id
   *      parameters:
   *        - in: path
   *          name: id
   *          description: video ID to get the data of this video
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/VideoBaseResponseDto'
   *        '404':
   *          description: video does not exist
   */

  @httpGet('/:id', optionalAuthenticationMiddleware, authenticationMiddleware)
  public async get(@requestParam('id') id: string, @request() req: ExtendedRequest): Promise<VideoBaseResponseDto> {
    let userId: string | undefined = undefined;
    if (req.user) {
      userId = req.user.id;
    }

    const video = await this.videoService.getById(id, userId);

    if (!video) {
      throw new NotFound('video does not exist');
    }

    return video;
  }
  /**
   * @swagger
   * /users:
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
  public async getAll(): Promise<Video[]> {
    return this.videoService.getAll();
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

  @httpPost('/reaction/:id', authenticationMiddleware)
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
      throw new NotFound('does not exist');
    }

    return res;
  }
}
