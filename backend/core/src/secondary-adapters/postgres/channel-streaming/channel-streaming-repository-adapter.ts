import { PrismaClient, StreamingKey, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { StreamStatus } from 'shared/build';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class ChannelStreamingRepositoryAdapter implements ChannelStreamingRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getPendingStream(channelId: string): Promise<Video | null> {
    return this.prismaClient.video.findFirst({
      where: {
        channelId,
        status: StreamStatus.WAITING,
      },
    });
  }

  getCurrentStream(channelId: string): Promise<Video | null> {
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
}
