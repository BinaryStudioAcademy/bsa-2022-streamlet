import { Channel, User } from '@prisma/client';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import { ChannelInfoRequestDto, ChannelInfoResponseDto, CONTAINER_TYPES } from '~/shared/types/types';

@controller(ApiPath.CHANNEL_CRUD)
export class ChannelCrudController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService) {
    super();
  }

  @httpGet(ChannelCrudApiPath.$ID)
  public async getOne(@requestParam() { id }: ChannelInfoRequestDto): Promise<ChannelInfoResponseDto> {
    const channel = await this.channelService.getChannelById(id);
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_ID_NOT_FOUND);
    }
    return trimChannel(channel);
  }
}

const trimChannel = (
  channel: Channel & {
    author: User;
    _count: {
      subscriptions: number;
    };
  },
): ChannelInfoResponseDto => {
  return {
    authorInfo: {
      id: channel.author.id,
      username: channel.author.username,
    },
    bannerImage: channel.bannerImage,
    avatar: channel.avatar,
    subscribersCount: channel._count.subscriptions,
    contactEmail: channel.contactEmail,
    description: channel.description,
    id: channel.id,
    name: channel.name,
  };
};
