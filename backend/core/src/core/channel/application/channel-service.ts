import { inject, injectable } from 'inversify';
import { LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';
import { AmqpQueue } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelRepository } from '../port/channel-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';

@injectable()
export class ChannelService {
  private channelRepository: ChannelRepository;
  private amqpChannel: AmqpChannelPort;

  constructor(
    @inject(CONTAINER_TYPES.ChannelRepository) channelRepository: ChannelRepository,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
  ) {
    this.channelRepository = channelRepository;
    this.amqpChannel = amqpChannel;
  }

  checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    return this.channelRepository.checkStreamingKey(key);
  }

  notifyTranscoderAboutStreamStart(streamData: LiveStartResponseDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(JSON.stringify(streamData)),
    });
  }

  prepareStreamEnd(key: string): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(JSON.stringify({ streamingKey: key })),
    });
  }

  getStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    return this.channelRepository.getStreamingKey(channelId);
  }

  resetStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    return this.channelRepository.resetStreamingKey(channelId);
  }
}
