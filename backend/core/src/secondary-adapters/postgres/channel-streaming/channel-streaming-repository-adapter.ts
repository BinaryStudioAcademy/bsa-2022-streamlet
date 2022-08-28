import { PrismaClient, StreamingKey, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { StreamStatus } from 'shared/build';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';

@injectable()
export class ChannelStreamingRepositoryAdapter implements ChannelStreamingRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getPendingStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null> {
    return this.prismaClient.video.findFirst({
      where: {
        channelId,
        status: StreamStatus.WAITING,
      },
      include: {
        categories: true,
        tags: true,
      },
    });
  }

  getCurrentStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null> {
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
}
