import { inject, injectable } from 'inversify';
import { LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';
import { AmqpQueue, StreamingStatus } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelRepository } from '../port/channel-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { generateUuid } from '~/shared/helpers';

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

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    const keyRecord = await this.channelRepository.getKeyRecord({ key });
    if (!keyRecord) {
      return null;
    }
    const pendingStream = await this.channelRepository.getVideo({
      channelId: keyRecord.channelId,
      status: StreamingStatus.PENDING,
    });
    if (!pendingStream) {
      return null;
    }
    return {
      videoId: pendingStream.id,
      streamingKey: key,
    };
  }

  notifyTranscoderAboutStreamStart(streamData: LiveStartResponseDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(
        JSON.stringify({
          ...streamData,
          isLive: true,
        }),
      ),
    });
  }

  notifyTranscoderAboutStreamEnd(streamingKey: string): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(
        JSON.stringify({
          streamingKey,
          isLive: false,
        }),
      ),
    });
  }

  async getStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    const keyRecord = await this.channelRepository.getKeyRecord({ channelId });
    if (!keyRecord) {
      return null;
    }
    return {
      channelId,
      streamingKey: keyRecord.key,
    };
  }

  async resetStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    const newKey = generateUuid();
    const updatedKeyRecord = await this.channelRepository.updateStreamingKey(channelId, newKey);
    if (!updatedKeyRecord) {
      return null;
    }
    return {
      channelId,
      streamingKey: updatedKeyRecord.key,
    };
  }
}
