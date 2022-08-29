import { BaseHttpController, controller, httpPost, request, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { ApiPath, ChannelSubscriptionApiPath, CreateSubscriptionResponseDto } from 'shared/build';
import { authenticationMiddleware } from '~/primary-adapters/rest/middleware';
import { ChannelSubscriptionService } from '~/core/channel-subscription/application/channel-subscription-service';
import { NotFound } from '~/shared/exceptions/not-found';

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
  private channelService: ChannelSubscriptionService;

  constructor(@inject(CONTAINER_TYPES.ChannelSubscriptionService) channelService: ChannelSubscriptionService) {
    super();

    this.channelService = channelService;
  }

  @httpPost(`${ChannelSubscriptionApiPath.SUBSCRIBE}${ChannelSubscriptionApiPath.$ID}`, authenticationMiddleware)
  public async addSubscription(
    @requestParam('id') id: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateSubscriptionResponseDto | null> {
    const { id: userId } = req.user;

    const res = this.channelService.toggleSubscription(userId, id);

    if (res === null) {
      throw new NotFound('Such channel doesn`t exist');
    }

    return res;
  }
}
