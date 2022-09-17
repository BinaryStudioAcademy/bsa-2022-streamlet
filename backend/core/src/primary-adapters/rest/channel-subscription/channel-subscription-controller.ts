import { BaseHttpController, controller, httpPost, request, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import {
  ApiPath,
  ChannelSubscriptionApiPath,
  ChannelSubscriptionStatus,
  CreateSubscriptionResponseDto,
} from 'shared/build';
import { authenticationMiddleware } from '~/primary-adapters/rest/middleware';
import { ChannelSubscriptionService } from '~/core/channel-subscription/application/channel-subscription-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { trimChannelToSubscriptionChannel } from '~/shared/helpers';
import { ChannelStatsService } from '~/core/channel-stats/application/channel-stats-service';

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
@controller(ApiPath.CHANNEL_SUBSCRIPTION)
export class ChannelSubscriptionController extends BaseHttpController {
  private channelSubscriptionService: ChannelSubscriptionService;

  constructor(
    @inject(CONTAINER_TYPES.ChannelSubscriptionService) channelSubscriptionService: ChannelSubscriptionService,
    @inject(CONTAINER_TYPES.ChannelCrudService) private channelCrudService: ChannelCrudService,
    @inject(CONTAINER_TYPES.ChannelStatsService) private channelStatsService: ChannelStatsService,
  ) {
    super();

    this.channelSubscriptionService = channelSubscriptionService;
  }

  @httpPost(`${ChannelSubscriptionApiPath.SUBSCRIBE}${ChannelSubscriptionApiPath.$ID}`, authenticationMiddleware)
  public async addSubscription(
    @requestParam('id') id: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateSubscriptionResponseDto | null> {
    const { id: userId } = req.user;

    const res = await this.channelSubscriptionService.toggleSubscription(userId, id);
    const channel = await this.channelCrudService.getChannelById({ id });

    if (res === null || channel === null) {
      throw new NotFound('Such channel doesn`t exist');
    }

    const referer = req.headers.referer;
    const source = referer ? new URL(referer).pathname.split('/')[1] : '';
    await this.channelStatsService.createChannelStat({
      userId,
      channelId: id,
      source,
      stats: {
        subscription: res.isSubscribed ? ChannelSubscriptionStatus.SUBSCRIBED : ChannelSubscriptionStatus.UNSUBSCRIBED,
      },
    });

    return { ...res, channel: trimChannelToSubscriptionChannel(channel) };
  }
}
