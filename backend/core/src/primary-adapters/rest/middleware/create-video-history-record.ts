import { BaseMiddleware } from 'inversify-express-utils';
import { ExtendedRequest } from '~/shared/types/express';
import express from 'express';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { HistoryService } from '~/core/history/application/history-service';
import { VideoService } from '~/core/video/application/video-service';
import { NotFound } from '~/shared/exceptions/not-found';

@injectable()
class CreateVideoHistoryRecordMiddleware extends BaseMiddleware {
  private historyService;
  private videoService;

  constructor(
    @inject(CONTAINER_TYPES.HistoryService) historyService: HistoryService,
    @inject(CONTAINER_TYPES.VideoService) videoService: VideoService,
  ) {
    super();
    this.historyService = historyService;
    this.videoService = videoService;
  }
  public async handler(req: ExtendedRequest, _res: express.Response, next: express.NextFunction): Promise<void> {
    if (req.user) {
      const { id: userId } = req.user;
      const videoId = req.params.videoId;

      const video = await this.videoService.getById(videoId);
      if (!video) {
        throw new NotFound('Such video doesn`t exist');
      }

      await this.historyService.createHistoryItem({ userId, videoId });
    }
    next();
  }
}

export { CreateVideoHistoryRecordMiddleware };
