import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  request,
  requestParam,
} from 'inversify-express-utils';
import {
  ChannelProfileUpdateMediaRequestDto,
  ChannelProfileUpdateRequestDto,
  ChannelProfileUpdateResponseDto,
} from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { errorCodes, NotFound } from '~/shared/exceptions/exceptions';
import { trimChannelInfo } from '~/shared/helpers';
import {
  ChannelInfoResponseDto,
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
  ExtendedRequest,
} from '~/shared/types/types';
import { optionalAuthenticationMiddleware } from '../middleware/optional-authentication-middleware';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.CHANNEL_CRUD)
export class ChannelCrudController extends BaseHttpController {
  constructor(
    @inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService,
    @inject(CONTAINER_TYPES.ChannelSubscriptionRepository)
    private channelSubscriptionRepository: ChannelSubscriptionRepository,
  ) {
    super();
  }

  //TODO:create enum for this route
  @httpGet('/author', authenticationMiddleware)
  public async getChannelByAuthorId(
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const { id } = req.user;
    const channel = await this.channelService.getChannelByAuthorId({ id });
    if (!channel) {
      throw new NotFound('Channel not found');
    }

    return channel;
  }

  @httpGet(ChannelCrudApiPath.$ID, optionalAuthenticationMiddleware)
  public async getOne(
    @requestParam('channelId') id: string,
    @request() req: ExtendedRequest,
  ): Promise<ChannelInfoResponseDto> {
    const channel = await this.channelService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
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

  @httpPost(
    `${ChannelCrudApiPath.AVATAR}${ChannelCrudApiPath.$ID}`,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelOwnerMiddleWare,
  )
  public async updateAvatar(
    @requestParam('channelId') id: string,
    @requestBody() { base64Str }: ChannelProfileUpdateMediaRequestDto,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const updatedChannel = await this.channelService.updateAvatar({
      id,
      base64Str,
    });

    return updatedChannel;
  }

  @httpPost(
    `${ChannelCrudApiPath.BANNER}${ChannelCrudApiPath.$ID}`,
    authenticationMiddleware,
    CONTAINER_TYPES.ChannelOwnerMiddleWare,
  )
  public async updateBanner(
    @requestParam('channelId') id: string,
    @requestBody() { base64Str }: ChannelProfileUpdateMediaRequestDto,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const updatedChannel = await this.channelService.updateBanner({
      id,
      base64Str,
    });

    return updatedChannel;
  }

  @httpPut(ChannelCrudApiPath.$ID, authenticationMiddleware, CONTAINER_TYPES.ChannelOwnerMiddleWare)
  public async updateSettings(
    @requestParam('channelId') id: string,
    @requestBody() { name, description }: ChannelProfileUpdateRequestDto,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const updatedChannel = await this.channelService.updateSettings({
      id,
      name,
      description,
    });

    return updatedChannel;
  }
}
