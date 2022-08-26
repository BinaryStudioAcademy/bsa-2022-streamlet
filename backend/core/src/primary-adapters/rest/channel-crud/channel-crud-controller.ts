import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, request, requestParam } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import { trimChannelInfo } from '~/shared/helpers';
import {
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  CONTAINER_TYPES,
  CreateSubscriptionResponseDto,
  ExtendedAuthenticatedRequest,
} from '~/shared/types/types';
import { authenticationMiddleware } from '~/primary-adapters/rest/middleware';

@controller(ApiPath.CHANNEL_CRUD)
export class ChannelCrudController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService) {
    super();
  }

  @httpGet(ChannelCrudApiPath.$ID)
  public async getOne(@requestParam() { id }: ChannelInfoRequestDto): Promise<ChannelInfoResponseDto> {
    const channel = await this.channelService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_ID_NOT_FOUND);
    }
    return trimChannelInfo(channel);
  }

  /**
   * @swagger
   * /subscribe:
   *    post:
   *      tags:
   *        - channel
   *      operationId: channelSubscribe
   *      security:
   *        - bearerAuth: []
   *      consumes:
   *        - application/json
   *      produces:
   *        - application/json
   *      description: subscribe or unsubscribe to channel
   *      parameters:
   *        - in: path
   *          name: id
   *          description: channel ID to get the key
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        '200':
   *          description: successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/CreateSubscriptionResponseDto'
   *        '404':
   *          description: channel does not exist
   */
  @httpPost(`${ChannelCrudApiPath.SUBSCRIPTION}${ChannelCrudApiPath.$ID}`, authenticationMiddleware)
  public async addSubscription(
    @requestParam('id') id: string,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<CreateSubscriptionResponseDto | null> {
    const { id: userId } = req.user;

    const res = this.channelService.toggleSubscription(userId, id);

    if (res === null) {
      throw new NotFound('channel does not exist');
    }

    return res;
  }
}
