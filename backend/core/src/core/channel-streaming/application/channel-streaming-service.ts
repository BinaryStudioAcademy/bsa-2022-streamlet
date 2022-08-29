import { inject, injectable } from 'inversify';
import { LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';
import { AmqpQueue } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStreamingRepository } from '../port/channel-streaming-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { generateUuid } from '~/shared/helpers';
import { VideoRepository } from '~/core/video/port/video-repository';
import {
  ImageStorePresetType,
  OwnChannelResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamStatus,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { castToVideoStreamResponseDto, castToOwnChannelDto } from './dtos/dtos';
import { ImageStorePort } from '~/core/common/port/image-store';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';

@injectable()
export class ChannelStreamingService {
  private channelStreamingRepository: ChannelStreamingRepository;
  private videoRepository: VideoRepository;
  private imageStore: ImageStorePort;
  private amqpChannel: AmqpChannelPort;

  constructor(
    @inject(CONTAINER_TYPES.ChannelStreamingRepository) channelStreamingRepository: ChannelStreamingRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
  ) {
    this.channelStreamingRepository = channelStreamingRepository;
    this.videoRepository = videoRepository;
    this.imageStore = imageStore;
    this.amqpChannel = amqpChannel;
  }

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    const keyRecord = await this.channelStreamingRepository.getStreamingKey({ key });
    if (!keyRecord) {
      return null;
    }
    const pendingStream = await this.channelStreamingRepository.getPendingStream(keyRecord.channelId);
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
    const keyRecord = await this.channelStreamingRepository.getStreamingKey({ channelId });
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
    const updatedKeyRecord = await this.channelStreamingRepository.updateStreamingKey(channelId, newKey);
    if (!updatedKeyRecord) {
      return null;
    }
    return {
      channelId,
      streamingKey: updatedKeyRecord.key,
    };
  }

  async getOwnChannel(userId: string): Promise<OwnChannelResponseDto | null> {
    const ownChannel = await this.channelStreamingRepository.getOwnChannel(userId);
    if (!ownChannel) {
      return null;
    }

    return castToOwnChannelDto(ownChannel);
  }

  async createStream(channelId: string): Promise<VideoStreamResponseDto | undefined | null> {
    const existingStream = await this.getCurrentStream(channelId);
    if (existingStream !== null) {
      return null;
    }

    const stream = await this.channelStreamingRepository.createStream(channelId);
    return castToVideoStreamResponseDto(stream);
  }

  async uploadStreamPoster({
    base64Str,
    videoId,
  }: StreamPosterUploadRequestDto): Promise<VideoStreamResponseDto | null> {
    const isVideoExisting = await this.videoRepository.getById(videoId);
    if (!isVideoExisting) {
      return null;
    }

    const { url } = await this.imageStore.upload({ base64Str, type: ImageStorePresetType.STREAM_POSTER });

    const update = await this.channelStreamingRepository.updateStream(videoId, { poster: url });
    if (!update) {
      return null;
    }

    return castToVideoStreamResponseDto(update);
  }

  async update(streamUpdateRequestDto: StreamUpdateRequestDto): Promise<VideoStreamResponseDto | null> {
    const { videoId } = streamUpdateRequestDto;
    const isVideoExisting = await this.videoRepository.getById(videoId);
    if (!isVideoExisting) {
      return null;
    }

    const update = await this.channelStreamingRepository.updateStream(videoId, streamUpdateRequestDto);
    if (!update) {
      return null;
    }

    return castToVideoStreamResponseDto(update);
  }

  async getCurrentStream(channelId: string): Promise<VideoStreamResponseDto | null> {
    const currentStream = await this.channelStreamingRepository.getCurrentStream(channelId);
    if (!currentStream) {
      return null;
    }

    return castToVideoStreamResponseDto(currentStream);
  }

  async liveControl(streamLiveStatusRequestDto: StreamLiveStatusRequestDto): Promise<VideoStreamResponseDto | null> {
    const { status, videoId } = streamLiveStatusRequestDto;

    if (status === StreamStatus.WAITING) {
      return null;
    }

    let update: VideoStreamResponseBeforeTrimming | null = null;

    if (status === StreamStatus.LIVE) {
      update = await this.channelStreamingRepository.updateStream(videoId, {
        status,
        publishedAt: new Date(),
      });
    }

    if (status === StreamStatus.FINISHED) {
      const currentStream = await this.videoRepository.getById(videoId);
      if (!currentStream || !currentStream.publishedAt) {
        return null;
      }

      update = await this.channelStreamingRepository.updateStream(videoId, {
        status,
        duration: Math.abs((new Date(currentStream.publishedAt).getTime() - new Date().getTime()) / 1000),
      });
    }

    if (!update) {
      return null;
    }

    return castToVideoStreamResponseDto(update);
  }
}
