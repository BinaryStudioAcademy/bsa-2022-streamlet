import { BaseHttpController, controller, httpPost, requestBody } from 'inversify-express-utils';
import {
  CONTAINER_TYPES,
  ResetStreamingKeyRequestDto,
  ResetStreamingKeyResponseDto,
  RtmpLiveRequestDto,
} from '~/shared/types/types';
import { ApiPath, ChannelApiPath } from '~/shared/enums/api/api';
import { ChannelService } from '~/core/channel/application/channel-service';
import { inject } from 'inversify';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';

@controller(ApiPath.CHANNEL)
export class ChannelController extends BaseHttpController {
  private channelService: ChannelService;

  constructor(@inject(CONTAINER_TYPES.ChannelService) channelService: ChannelService) {
    super();
    this.channelService = channelService;
  }

  @httpPost(ChannelApiPath.LIVE)
  public async goLive(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    const streamData = await this.channelService.checkStreamingKey(rtmpLiveRequestDto.name);
    if (streamData === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }
    this.channelService.notifyTranscoderAboutStreamStart(streamData);
    return;
  }

  @httpPost(ChannelApiPath.LIVE_DONE)
  public async prepareStreamEnd(@requestBody() rtmpLiveRequestDto: RtmpLiveRequestDto): Promise<void> {
    this.channelService.prepareStreamEnd(rtmpLiveRequestDto.name);
    return;
  }

  @httpPost(ChannelApiPath.RESET_STREAMING_TOKEN)
  public async resetStreamingKey(
    @requestBody() resetStreamingKeyRequestDto: ResetStreamingKeyRequestDto,
  ): Promise<ResetStreamingKeyResponseDto> {
    const keyData = await this.channelService.resetStreamingKey(resetStreamingKeyRequestDto.channelId);
    if (keyData === null) {
      throw new NotFound('Invalid channel id');
    }
    return keyData;
  }
}
