import express from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ExtendedAuthenticatedRequest } from '~/shared/types/express';

@injectable()
export class ChannelOwnerMiddleWare extends BaseMiddleware {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService) {
    super();
  }
  public async handler(
    req: ExtendedAuthenticatedRequest,
    _res: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const { id: userId } = req.user;
    const { id } = req.params;
    const isUserOwner = await this.channelService.isUserChannelOwner({
      channelId: id,
      userId,
    });
    if (!isUserOwner) {
      next(new Forbidden());
    }
    return next();
  }
}
