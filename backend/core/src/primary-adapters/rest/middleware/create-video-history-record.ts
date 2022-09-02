import { BaseMiddleware } from 'inversify-express-utils';
import { ExtendedRequest } from '~/shared/types/express';
import express from 'express';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { HistoryService } from '~/core/history/application/history-service';

@injectable()
class CreateVideoHistoryRecordMiddleware extends BaseMiddleware {
  private historyService;
  constructor(@inject(CONTAINER_TYPES.HistoryService) historyService: HistoryService) {
    super();
    this.historyService = historyService;
  }
  public async handler(req: ExtendedRequest, _res: express.Response, next: express.NextFunction): Promise<void> {
    if (req.user) {
      const { id: userId } = req.user;
      const videoId = req.params.id;
      await this.historyService.createHistoryItem({ userId, videoId });
    }
    next();
  }
}

export { CreateVideoHistoryRecordMiddleware };
