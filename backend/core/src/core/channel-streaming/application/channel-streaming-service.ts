import { inject, injectable } from 'inversify';
import { ChangeChatToggleResponseDto, LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';
import { AmqpQueue, StreamingStatus } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStreamingRepository } from '../port/channel-streaming-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { generateUuid } from '~/shared/helpers';
import { VideoWithChannelAndAuthorDto } from '~/shared/types/video/video-with-channel-and-author-dto.type';

@injectable()
export class ChannelStreamingService {
  private channelRepository: ChannelStreamingRepository;
  private amqpChannel: AmqpChannelPort;

  constructor(
    @inject(CONTAINER_TYPES.ChannelStreamingRepository) channelRepository: ChannelStreamingRepository,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
  ) {
    this.channelRepository = channelRepository;
    this.amqpChannel = amqpChannel;
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

  async getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null> {
    return this.channelRepository.getVideoById(videoId);
  }

  async changeChatToggle(videoId: string, chatToggle: boolean): Promise<ChangeChatToggleResponseDto | null> {
    const updatedVideo = await this.channelRepository.changeChatToggle(videoId, chatToggle);
    if (!updatedVideo) {
      return null;
    }
    return {
      videoId: updatedVideo.id,
      isChatEnabled: updatedVideo.isChatEnabled,
    };
  }
}
