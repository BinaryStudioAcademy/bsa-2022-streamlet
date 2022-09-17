import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody, request, requestParam } from 'inversify-express-utils';
import { CreateChannelStatRequestDto } from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ChannelStatsService } from '~/core/channel-stats/application/channel-stats-service';
import { ApiPath, ChannelStatsApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { errorCodes, NotFound } from '~/shared/exceptions/exceptions';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.CHANNEL_STATS)
export class ChannelStatsController extends BaseHttpController {
  constructor(
    @inject(CONTAINER_TYPES.ChannelStatsService) private channelStatsService: ChannelStatsService,
    @inject(CONTAINER_TYPES.ChannelCrudService) private channelCrudService: ChannelCrudService,
  ) {
    super();
  }

  @httpPost(ChannelStatsApiPath.$ID, authenticationMiddleware)
  public async createChannelStat(
    @requestParam('channelId') id: string,
    @requestBody() { stats }: CreateChannelStatRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<boolean> {
    const channel = await this.channelCrudService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    const referer = req.headers.referer;
    const source = referer ? new URL(referer).pathname.split('/')[1] : '';
    const user = req.user;
    const channelStats = await this.channelStatsService.createChannelStat({
      channelId: id,
      userId: user.id,
      source,
      stats,
    });

    return channelStats;
  }
}
