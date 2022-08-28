import express from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { errorCodes } from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { VideoService } from '~/core/video/application/video-service';
import { exceptionMessages } from '~/shared/enums/messages';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ExtendedAuthenticatedRequest } from '~/shared/types/express';

@injectable()
export class ChannelActionMiddleware extends BaseMiddleware {
  private channelCrudService: ChannelCrudService;
  private videoService: VideoService;

  constructor(
    @inject(CONTAINER_TYPES.ChannelCrudService) channelCrudService: ChannelCrudService,
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
  ) {
    super();
    this.channelCrudService = channelCrudService;
    this.videoService = videoService;
  }

  public async handler(
    req: ExtendedAuthenticatedRequest,
    _res: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const { id: userId } = req.user;
    let authorId: string | undefined;

    if ('videoId' in req.body) {
      authorId = await this.videoService.getAuthorByVideoId(req.body.videoId);
      this.validate(userId, authorId, next);
    }
    if ('channelId' in req.body) {
      authorId = await this.channelCrudService.getAuthorByChannelId(req.body.channelId);
      this.validate(userId, authorId, next);
    }
    if ('videoId' in req.params) {
      authorId = await this.videoService.getAuthorByVideoId(req.params.videoId);
      this.validate(userId, authorId, next);
    }
    if ('channelId' in req.params) {
      authorId = await this.channelCrudService.getAuthorByChannelId(req.params.channelId);
      this.validate(userId, authorId, next);
    }

    next();
  }

  private validate(userId: string, authorId: string | undefined, next: express.NextFunction): void {
    if (!authorId) {
      return next(new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND));
    }
    if (userId !== authorId) {
      return next(new Forbidden(exceptionMessages.channelCrud.FORBIDDEN, errorCodes.stream.FORBIDDEN));
    }
  }
}
