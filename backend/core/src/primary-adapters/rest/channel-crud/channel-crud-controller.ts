import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { ChannelCrudService } from '~/core/channel-crud/application/channel-crud-service';
import { ApiPath, ChannelCrudApiPath } from '~/shared/enums/api/api';
import { exceptionMessages } from '~/shared/enums/messages';
import { NotFound } from '~/shared/exceptions/exceptions';
import { trimChannelInfo } from '~/shared/helpers';
import { ChannelInfoRequestDto, ChannelInfoResponseDto, CONTAINER_TYPES } from '~/shared/types/types';

@controller(ApiPath.CHANNEL_CRUD)
export class ChannelCrudController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudService) private channelService: ChannelCrudService) {
    super();
  }

  @httpGet(ChannelCrudApiPath.$ID)
  public async getOne(@requestParam() { id }: ChannelInfoRequestDto): Promise<ChannelInfoResponseDto> {
    const channel = await this.channelService.getChannelById({ id });
    if (!channel) {
      throw new NotFound(exceptionMessages.channelCrud.CHANNEL_NOT_FOUND, errorCodes.stream.NOT_FOUND);
    }
    return trimChannelInfo(channel);
  }
}
