import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  ResetStreamingKeyRequestDto,
  ResetStreamingKeyResponseDto,
  RtmpLiveRequestDto,
} from '~/shared/types/types';
import { ApiPath } from '~/shared/enums/api/api';
import { ChannelService } from '~/core/channel/application/channel-service';
import { inject } from 'inversify';

@controller(ApiPath.CHANNEL)
export class ChannelController extends BaseHttpController {
  private channelService: ChannelService;

  constructor(@inject(CONTAINER_TYPES.ChannelService) channelService: ChannelService) {
    super();
    this.channelService = channelService;
  }

  @httpPost('/live')
  public async goLive(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.checkStreamingKey(rtmpLiveRequestDto.name);
    return;
  }

  @httpPost('/live_done')
  public async endStream(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.finishStream(rtmpLiveRequestDto.name);
    return;
  }

  @httpPost('/reset_streaming_token')
  public async resetStreamingKey(
    @requestBody() resetStreamingKeyRequestDto: ResetStreamingKeyRequestDto,
  ): Promise<ResetStreamingKeyResponseDto> {
    return this.channelService.resetStreamingKey(resetStreamingKeyRequestDto.channelId);
  }
}
