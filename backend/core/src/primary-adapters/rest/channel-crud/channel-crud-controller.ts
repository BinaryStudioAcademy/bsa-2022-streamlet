import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { StreamingStatus } from '~/shared/enums/enums';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import {
  ChannelInfoBeforeTrimming,
  ChannelInfoRequestDto,
  ChannelInfoResponseDto,
  CONTAINER_TYPES,
} from '~/shared/types/types';

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
    return trimChannel(channel);
  }
}

const trimChannel = (channel: ChannelInfoBeforeTrimming): ChannelInfoResponseDto => {
  return {
    authorInfo: {
      id: channel.author.id,
      username: channel.author.username,
      firstName: channel.author.profile?.firstName ?? '',
      lastName: channel.author.profile?.lastName ?? '',
    },
    initialVideosPage: {
      videos: channel.videos.map((video) => ({
        ...video,
        tags: video.tags.map((tag) => tag.name),
        status: video.status as StreamingStatus,
        categories: video.categories.map((category) => category.name),
        createdAt: video.createdAt.toISOString(),
        updatedAt: video.updatedAt.toISOString(),
      })),
    },
    bannerImage: channel.bannerImage,
    avatar: channel.avatar,
    subscribersCount: channel._count.subscriptions,
    contactEmail: channel.contactEmail,
    description: channel.description,
    id: channel.id,
    createdAt: channel.createdAt.toISOString(),
    name: channel.name,
  };
};
