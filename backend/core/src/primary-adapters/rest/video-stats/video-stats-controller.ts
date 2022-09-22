import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, requestBody, request } from 'inversify-express-utils';
import { CreateManyVideoStatsRequestDto, errorCodes } from 'shared/build';
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

  @httpPost(VideoStatsApiPath.ROOT, optionalAuthenticationMiddleware)
  public async createManyVideoStats(
    @requestBody() reqVideoStats: CreateManyVideoStatsRequestDto,
    @request() req: ExtendedRequest,
  ): Promise<Record<string, boolean>> {
    const reqVideoIds = Object.keys(reqVideoStats);
    const videos = await this.videoService.getVideosByIds(reqVideoIds);
    if (videos.length === 0) {
      throw new NotFound(exceptionMessages.video.VIDEOS_NOT_FOUND, errorCodes.video.NO_VIDEOS);
    }
    const videoIds = videos.map((v) => v.id);
    const videoStatsData = reqVideoIds
      .filter((id) => videoIds.includes(id))
      .reduce((data, id) => {
        data[id] = reqVideoStats[id];
        return data;
      }, {} as CreateManyVideoStatsRequestDto);
    const user = req.user;
    await this.videoStatsService.createManyVideoStats({
      userId: user?.id,
      data: videoStatsData,
    });

    const res = reqVideoIds.reduce(
      (o, id) => ({
        ...o,
        [id]: videoIds.includes(id),
      }),
      {} as Record<string, boolean>,
    );

    return res;
  }
}
