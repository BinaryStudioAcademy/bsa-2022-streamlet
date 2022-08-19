import { BaseHttpController, controller, httpPost, request, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES, ExtendedAuthenticatedRequest } from '~/shared/types/types';
import { CreateSubscriptionResponseDto, HttpError } from 'shared/build';
import { ChannelService } from '~/core/channel/application/channel-service';
import { authenticationMiddleware } from '~/primary-adapters/rest/middleware';

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
@controller('/channel')
export class ChannelController extends BaseHttpController {
  private channelService: ChannelService;

  constructor(@inject(CONTAINER_TYPES.ChannelService) channelService: ChannelService) {
    super();

    this.channelService = channelService;
  }

  @httpPost('/subscription/:id', authenticationMiddleware)
  public async addSubscription(
    @requestParam('id') id: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateSubscriptionResponseDto | null> {
    const { id: userId } = req.user;

    const res = this.channelService.addSubscription(userId, id);

    if (res === null) {
      throw new HttpError({ message: 'channel dont found', status: 404 });
    }

    return res;
  }
}
