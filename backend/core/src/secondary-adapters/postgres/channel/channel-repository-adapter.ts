import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';
import { StreamingStatus } from '~/shared/enums/enums';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { generateUuid } from '~/shared/helpers';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class ChannelRepositoryAdapter implements ChannelRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto | null> {
    const keyRecord = await this.prismaClient.streamingKey.findFirst({
      where: {
        key,
      },
    });
    if (!keyRecord) {
      return null;
    }
    const pendingStream = await this.prismaClient.video.findFirst({
      where: {
        channelId: keyRecord.channelId,
        status: StreamingStatus.PENDING,
      },
    });
    if (!pendingStream) {
      return null;
    }
    return {
      videoId: pendingStream.id,
      streamingKey: key,
    };
  }

  async getStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    const key = await this.prismaClient.streamingKey.findFirst({
      where: {
        channelId,
      },
    });
    if (!key) {
      return null;
    }
    return {
      channelId,
      streamingKey: key.key,
    };
  }

  async resetStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null> {
    const updatedKey = await this.prismaClient.streamingKey.update({
      where: {
        channelId,
      },
      data: {
        key: generateUuid(),
      },
    });
    if (!updatedKey) {
      return null;
    }
    return {
      channelId,
      streamingKey: updatedKey.key,
    };
  }
}
