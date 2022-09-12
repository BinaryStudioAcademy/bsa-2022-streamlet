import { inject, injectable } from 'inversify';
import {
  LiveStartResponseDto,
  StreamingKeyResponseDto,
  StreamingKeyWithAuthorResponseDto,
  ChangeChatToggleResponseDto,
  VideoWithChannelAndAuthorDto,
} from '~/shared/types/types';
import { AmqpQueue, StreamStatus } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelStreamingRepository } from '../port/channel-streaming-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { generateUuid, omitProperties } from '~/shared/helpers';
import { VideoRepository } from '~/core/video/port/video-repository';
import {
  ImageStorePresetType,
  OwnChannelResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamPosterUploadResponseDto,
  StreamPrivacy,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';
import { castToVideoStreamResponseDto, castToOwnChannelDto } from './dtos/dtos';
import { ImageStorePort } from '~/core/common/port/image-store';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';
import { CategoryService } from '~/core/category/application/category-service';
import { TagService } from '~/core/tag/application/tag-service';
import { normalizeTagStringArrayPayload } from '~/primary-adapters/rest/tag/helpers/normalize-tag-string-array-helper';
import { normalizeCategoryStringArrayPayload } from '~/primary-adapters/rest/category/helpers/normalize-category-string-array-helper';

@injectable()
export class ChannelStreamingService {
  private channelStreamingRepository: ChannelStreamingRepository;
  private videoRepository: VideoRepository;
  private imageStore: ImageStorePort;
  private amqpChannel: AmqpChannelPort;
  private categoryService: CategoryService;
  private tagService: TagService;

  constructor(
    @inject(CONTAINER_TYPES.ChannelStreamingRepository) channelStreamingRepository: ChannelStreamingRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
    @inject(CONTAINER_TYPES.CategoryService) categoryService: CategoryService,
    @inject(CONTAINER_TYPES.TagService) tagService: TagService,
  ) {
    this.channelStreamingRepository = channelStreamingRepository;
    this.videoRepository = videoRepository;
    this.imageStore = imageStore;
    this.amqpChannel = amqpChannel;
    this.categoryService = categoryService;
    this.tagService = tagService;
  }

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    const keyRecord = await this.channelStreamingRepository.getStreamingKey({ key });
    if (!keyRecord) {
      return null;
    }
    const activeStream = await this.channelStreamingRepository.getActiveStream(keyRecord.channelId);
    if (!activeStream) {
      return null;
    }
    return {
      videoId: activeStream.id,
      channelId: keyRecord.channelId,
      streamingKey: key,
    };
  }

  notifyTranscoderAboutStreamStart(body: { authorId: string; streamData: LiveStartResponseDto }): void {
    this.amqpChannel.sendToQueue({
      queue: AmqpQueue.SOCKETS_STREAM_CONNECTED,
      content: Buffer.from(JSON.stringify(body)),
    });
    this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(JSON.stringify(body)),
    });
  }

  notifyTranscoderAboutStreamEnd(body: { authorId: string; streamingKey: string }): void {
    this.amqpChannel.sendToQueue({
      queue: AmqpQueue.SOCKETS_STREAM_DISCONNECTED,
      content: Buffer.from(JSON.stringify(body)),
    });
    this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_INTERRUPTED,
      content: Buffer.from(JSON.stringify(body)),
    });
  }

  async getAuthorIdByStreamingKey(key: string): Promise<StreamingKeyWithAuthorResponseDto | null> {
    const keyRecord = await this.channelStreamingRepository.getAuthorId({ key });
    if (!keyRecord) {
      return null;
    }
    return {
      authorId: keyRecord.channel.authorId,
      channelId: keyRecord.channelId,
      streamingKey: keyRecord.key,
    };
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
    const existingStream = await this.getActiveStream(channelId);
    if (existingStream !== null) {
      return null;
    }

    const stream = await this.channelStreamingRepository.createStream(channelId);
    return castToVideoStreamResponseDto(stream);
  }

  async uploadStreamPoster({
    base64Str,
    videoId,
  }: StreamPosterUploadRequestDto): Promise<StreamPosterUploadResponseDto | null> {
    const isVideoExisting = await this.videoRepository.getById(videoId);
    if (!isVideoExisting) {
      return null;
    }

    const { url: poster } = await this.imageStore.upload({ base64Str, type: ImageStorePresetType.STREAM_POSTER });

    return {
      poster,
      videoId,
    };
  }

  async update(streamUpdateRequestDto: StreamUpdateRequestDto): Promise<VideoStreamResponseDto | null> {
    const { videoId } = streamUpdateRequestDto;
    const isVideoExisting = await this.videoRepository.getById(videoId);
    if (!isVideoExisting) {
      return null;
    }

    if (streamUpdateRequestDto.categories && streamUpdateRequestDto.categories.length) {
      await this.categoryService.bindCategories({
        categoryPayload: normalizeCategoryStringArrayPayload(streamUpdateRequestDto.categories),
        videoId,
      });
    }
    if (streamUpdateRequestDto.tags && streamUpdateRequestDto.tags.length) {
      await this.tagService.bindTags({
        tagPayload: normalizeTagStringArrayPayload(streamUpdateRequestDto.tags),
        videoId,
      });
    }

    const update = await this.channelStreamingRepository.updateStream(
      videoId,
      omitProperties<StreamUpdateRequestDto>(['videoId', 'categories', 'tags'], streamUpdateRequestDto),
    );
    if (!update) {
      return null;
    }

    return castToVideoStreamResponseDto(update);
  }

  async getActiveStream(channelId: string): Promise<VideoStreamResponseDto | null> {
    const currentStream = await this.channelStreamingRepository.getActiveStream(channelId);
    if (!currentStream) {
      return null;
    }

    return castToVideoStreamResponseDto(currentStream);
  }

  async liveControl({ status, videoId }: StreamLiveStatusRequestDto): Promise<VideoStreamResponseDto | null> {
    if (status === StreamStatus.WAITING) {
      return null;
    }

    let update: VideoStreamResponseBeforeTrimming | null = null;

    if (status === StreamStatus.LIVE) {
      update = await this.channelStreamingRepository.updateStream(videoId, {
        status,
        publishedAt: new Date(),
        privacy: StreamPrivacy.PUBLIC,
      });
    }

    if (status === StreamStatus.FINISHED) {
      const currentStream = await this.videoRepository.getById(videoId);
      if (!currentStream || !currentStream.publishedAt) {
        return null;
      }

      update = await this.channelStreamingRepository.updateStream(videoId, {
        status,
        duration: Math.round((new Date().getTime() - new Date(currentStream.publishedAt).getTime()) / 1000),
      });
    }

    if (!update) {
      return null;
    }

    return castToVideoStreamResponseDto(update);
  }

  async getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null> {
    return this.channelStreamingRepository.getVideoById(videoId);
  }

  async changeChatToggle(videoId: string, chatToggle: boolean): Promise<ChangeChatToggleResponseDto | null> {
    const updatedVideo = await this.channelStreamingRepository.changeChatToggle(videoId, chatToggle);
    if (!updatedVideo) {
      return null;
    }
    return {
      videoId: updatedVideo.id,
      isChatEnabled: updatedVideo.isChatEnabled,
    };
  }

  notifyViewersAboutChatToggleChanged(body: { roomId: string; isChatEnabled: boolean }): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.NOTIFY_CHAT_ROOM_CHAT_IS_ENABLED,
      content: Buffer.from(JSON.stringify(body)),
    });
  }
}
