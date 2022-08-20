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
  VideoCommentResponseDto,
} from '~/shared/types/types';
import { HttpError, VideoBaseResponseDto, VideoCommentRequestDto } from 'shared/build';
import { VideoService } from '~/core/video/aplication/video-service';
import { Video } from '@prisma/client';
import { authenticationMiddleware, optionalAuthenticationMiddleware } from '~/primary-adapters/rest/middleware';

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

  @httpGet('/:id', optionalAuthenticationMiddleware)
  public async get(
    @requestParam('id') id: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoBaseResponseDto> {
    let userId: string | undefined = undefined;
    if (req.user) {
      userId = req.user.id;
    }

    const video = await this.videoService.getById(id, userId);

    if (!video) {
      throw new HttpError({ message: 'video dont found', status: 404 });
    }

    return video;
  }
  @httpGet('/')
  public async getAll(): Promise<Video[]> {
    return this.videoService.getAll();
  }
  @httpPost('/reaction/:id', authenticationMiddleware)
  public async addReaction(
    @requestParam('id') id: string,
    @requestBody() body: CreateReactionRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateReactionResponseDto> {
    const { id: userId } = req.user;

    const reactionResponse = await this.videoService.addReaction(body, id, userId);

    if (!reactionResponse) {
      throw new HttpError({ message: 'video or user dont found', status: 404 });
    }

    return reactionResponse;
  }
  @httpPost('/comment/:id', authenticationMiddleware)
  public async addComment(
    @requestBody() body: VideoCommentRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<VideoCommentResponseDto> {
    const { id: userId } = req.user;

    const res = await this.videoService.addComment(body, userId);

    if (!res) {
      throw new HttpError({ message: 'video dont found', status: 404 });
    }

    return res;
  }
}
