import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody, request, requestParam } from 'inversify-express-utils';
import { CreateVideoStatRequestDto, StreamStatus } from 'shared/build';
import { ChannelSubscriptionService } from '~/core/channel-subscription/application/channel-subscription-service';
import { VideoStatsService } from '~/core/video-stats/application/video-stats-service';
import { VideoService } from '~/core/video/application/video-service';
import { ApiPath, VideoStatsApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import { CONTAINER_TYPES, ExtendedRequest } from '~/shared/types/types';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';

@controller(ApiPath.VIDEO_STATS)
export class VideoStatsController extends BaseHttpController {
  constructor(
    @inject(CONTAINER_TYPES.VideoStatsService) private videoStatsService: VideoStatsService,
    @inject(CONTAINER_TYPES.VideoService) private videoService: VideoService,
    @inject(CONTAINER_TYPES.ChannelSubscriptionService) private channelSubscriptionService: ChannelSubscriptionService,
  ) {
    super();
  }

  @httpPost(VideoStatsApiPath.$ID, optionalAuthenticationMiddleware)
  public async createVideoStats(
    @requestParam('videoId') id: string,
    @requestBody() { stats }: CreateVideoStatRequestDto,
    @request() req: ExtendedRequest,
  ): Promise<boolean> {
    const video = await this.videoService.getById(id);
    if (!video) {
      throw new NotFound(exceptionMessages.video.VIDEO_ID_NOT_FOUND);
    }
    const referer = req.headers.referer;
    const source = referer ? new URL(referer).pathname.split('/')[1] : '';
    let wasSubscribed = false;
    const user = req.user;
    if (user) {
      const subs = await this.channelSubscriptionService.getUserSubscriptions(user.id);
      wasSubscribed = Boolean(subs.list.find((s) => s.channelId === video.channel.id));
    }
    const videoStats = await this.videoStatsService.createManyVideoStats({
      videoId: id,
      userId: user?.id,
      isLive: video.status === StreamStatus.LIVE,
      wasSubscribed: wasSubscribed,
      source,
      stats,
    });

    return videoStats;
  }
}
