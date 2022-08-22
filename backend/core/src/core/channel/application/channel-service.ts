import { inject, injectable } from 'inversify';
import {
  LiveStartResponseDto,
  StreamingKeyResponseDto,
  CreateSubscriptionResponseDto,
  ChannelBaseResponse,
} from '~/shared/types/types';
import { AmqpQueue, StreamingStatus } from '~/shared/enums/enums';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
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

  async toggleSubscription(userId: string, channelId: string): Promise<CreateSubscriptionResponseDto | null> {
    const channel = this.channelRepository.getChannelById(channelId);
    if (!channel) {
      return null;
    }
    const isUserSubscribe = await this.channelRepository.isUserSubscribe(channelId, userId);
    if (isUserSubscribe) {
      return this.channelRepository.removeSubscription(userId, channelId);
    }
    return this.channelRepository.addSubscription(userId, channelId);
  }

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    const keyRecord = await this.channelRepository.getStreamingKey({ key });
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
  getById(id: string): Promise<ChannelBaseResponse | null> {
    return this.channelRepository.getChannelById(id);
  }
  notifyTranscoderAboutStreamStart(streamData: LiveStartResponseDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(
        JSON.stringify({
          ...streamData,
        }),
      ),
    });
  }

  notifyTranscoderAboutStreamEnd(streamingKey: string): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_INTERRUPTED,
      content: Buffer.from(
        JSON.stringify({
          streamingKey,
        }),
      ),
    });
  }

  async getStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    const keyRecord = await this.channelRepository.getStreamingKey({ channelId });
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
