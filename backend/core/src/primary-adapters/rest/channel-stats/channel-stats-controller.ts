import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
  request,
  requestParam,
  httpGet,
} from 'inversify-express-utils';
import {
  ChannelStatsChartDataResponseDto,
  ChannelStatsOverviewResponseDto,
  CreateChannelStatRequestDto,
  GetChannelStatsRequestDto,
} from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ChannelStatsService } from '~/core/channel-stats/application/channel-stats-service';
import { ApiPath, ChannelStatsApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { errorCodes, NotFound } from '~/shared/exceptions/exceptions';
import { getDateTruncFormatByDateFrom } from '~/shared/helpers';
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

  @httpPost(
    `${ChannelStatsApiPath.GET}${ChannelStatsApiPath.$ID}`,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelActionMiddleware,
  )
  public async getChannelStats(
    @requestParam('channelId') id: string,
    @requestBody() channelStatsReq: GetChannelStatsRequestDto,
  ): Promise<ChannelStatsChartDataResponseDto> {
    const format = getDateTruncFormatByDateFrom(new Date(channelStatsReq.dateFrom));

    const viewsChartData = await this.channelStatsService.getChannelStats(id, channelStatsReq.dateFrom, format);
    return viewsChartData;
  }

  @httpGet(ChannelStatsApiPath.$ID)
  public async getChannelStatsOverview(
    @requestParam('channelId') id: string,
  ): Promise<ChannelStatsOverviewResponseDto> {
    const channel = await this.channelCrudService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }

    const watchTimeStats = await this.channelStatsService.getChannelStatWatchTime(id);
    const viewsStats = await this.channelStatsService.getChannelStatViews(id);

    return {
      id,
      views: viewsStats.views,
      watchTime: watchTimeStats.watchTime,
      subscribers: channel._count.subscriptions,
    };
  }
}
