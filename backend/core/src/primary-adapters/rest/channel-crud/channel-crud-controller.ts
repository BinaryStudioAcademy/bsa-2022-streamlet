import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { ChannelProfileUpdateMediaRequestDto, ChannelProfileUpdateResponseDto } from 'shared/build';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { Forbidden, NotFound } from '~/shared/exceptions/exceptions';
import { trimChannelInfo } from '~/shared/helpers';
import {
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
} from '~/shared/types/types';
import { authenticationMiddleware } from '../middleware';

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

  @httpPost(`${ChannelCrudApiPath.AVATAR}${ChannelCrudApiPath.$ID}`, authenticationMiddleware)
  public async updateAvatar(
    @requestParam() { id }: ChannelInfoRequestDto,
    @requestBody() { base64Str }: ChannelProfileUpdateMediaRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const { id: userId } = req.user;
    const isUserOwner = await this.channelService.isUserChannelOwner({
      channelId: id,
      userId,
    });
    if (!isUserOwner) {
      throw new Forbidden();
    }
    const updatedChannel = await this.channelService.updateAvatar({
      id,
      base64Str,
    });
    if (!updatedChannel) {
      throw new NotFound('Channel not found');
    }

    return updatedChannel;
  }

  @httpPost(`${ChannelCrudApiPath.BANNER}${ChannelCrudApiPath.$ID}`, authenticationMiddleware)
  public async updateBanner(
    @requestParam() { id }: ChannelInfoRequestDto,
    @requestBody() { base64Str }: ChannelProfileUpdateMediaRequestDto,
    @request() req: ExtendedAuthenticatedRequest,
  ): Promise<ChannelProfileUpdateResponseDto> {
    const { id: userId } = req.user;
    const isUserOwner = await this.channelService.isUserChannelOwner({
      channelId: id,
      userId,
    });
    if (!isUserOwner) {
      throw new Forbidden();
    }
    const updatedChannel = await this.channelService.updateBanner({
      id,
      base64Str,
    });
    if (!updatedChannel) {
      throw new NotFound('Channel not found');
    }

    return updatedChannel;
  }
}
