import { Channel, PrismaClient, StreamingKey, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { StreamStatus } from '~/shared/enums/enums';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';
import { StreamKeyResponseBeforeTrimming } from '~/shared/types/types';
import { VideoWithChannelAndAuthorDto } from '~/shared/types/video/video-with-channel-and-author-dto.type';

@injectable()
export class ChannelStreamingRepositoryAdapter implements ChannelStreamingRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getActiveStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null> {
    return this.prismaClient.video.findFirst({
      where: {
        channelId,
        OR: [
          {
            status: StreamStatus.WAITING,
          },
          {
            status: StreamStatus.LIVE,
          },
        ],
      },
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  getAuthorId(props: Partial<StreamingKey>): Promise<StreamKeyResponseBeforeTrimming | null> {
    return this.prismaClient.streamingKey.findFirst({
      where: {
        ...props,
      },
      include: {
        channel: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null> {
    return this.prismaClient.streamingKey.findFirst({
      where: {
        ...props,
      },
    });
  }

  updateStreamingKey(channelId: string, key: string): Promise<StreamingKey | null> {
    return this.prismaClient.streamingKey.update({
      where: {
        channelId,
      },
      data: {
        key,
      },
    });
  }

  createStreamingKey(channelId: string): Promise<StreamingKey> {
    return this.prismaClient.streamingKey.create({
      data: {
        channelId,
      },
    });
  }

  createStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming> {
    return this.prismaClient.video.create({
      data: {
        channelId: channelId,
      },
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  updateStream(videoId: string, props: Partial<Video>): Promise<VideoStreamResponseBeforeTrimming | null> {
    return this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        ...props,
      },
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  getOwnChannel(authorId: string): Promise<Channel | null> {
    return this.prismaClient.channel.findFirst({
      where: {
        authorId,
      },
    });
  }

  getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null> {
    return this.prismaClient.video.findFirst({
      where: {
        id: videoId,
      },
      include: {
        channel: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  changeChatToggle(videoId: string, chatToggle: boolean): Promise<Video | null> {
    return this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        isChatEnabled: chatToggle,
      },
    });
  }
}
