import { PrismaClient, StreamingKey, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { StreamingStatus } from '~/shared/enums/enums';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class ChannelRepositoryAdapter implements ChannelRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getPendingStream(channelId: string): Promise<Video | null> {
    return this.prismaClient.video.findFirst({
      where: {
        channelId,
        status: StreamingStatus.PENDING,
      },
    });
  }

  getKeyRecord(props: Partial<StreamingKey>): Promise<StreamingKey | null> {
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
