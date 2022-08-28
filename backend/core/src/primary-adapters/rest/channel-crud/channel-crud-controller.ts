import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, request, requestParam } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import { trimChannelInfo } from '~/shared/helpers';
import { ChannelInfoRequestDto, ChannelInfoResponseDto, CONTAINER_TYPES, ExtendedRequest } from '~/shared/types/types';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';

@controller(ApiPath.CHANNEL_CRUD)
export class ChannelCrudController extends BaseHttpController {
  constructor(
    @inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService,
    @inject(CONTAINER_TYPES.ChannelSubscriptionRepository)
    private channelSubscriptionRepository: ChannelSubscriptionRepository,
  ) {
    super();
  }

  @httpGet(ChannelCrudApiPath.$ID, optionalAuthenticationMiddleware)
  public async getOne(
    @requestParam() { id }: ChannelInfoRequestDto,
    @request() req: ExtendedRequest,
  ): Promise<ChannelInfoResponseDto> {
    const channel = await this.channelService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_ID_NOT_FOUND);
    }
    const basicChannelInfo = trimChannelInfo(channel);
    if (req.user) {
      const isCurrentUserSubscriber = await this.channelSubscriptionRepository.isUserSubscribed(
        channel.id,
        req.user.id,
      );
      return { ...basicChannelInfo, isCurrentUserSubscriber };
    }
    return { ...basicChannelInfo, isCurrentUserSubscriber: false };
  }
}
