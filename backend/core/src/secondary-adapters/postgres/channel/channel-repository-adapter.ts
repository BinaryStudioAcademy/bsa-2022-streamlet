import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LiveEndResponseDto, LiveStartResponseDto, ResetStreamingKeyResponseDto } from 'shared/build';
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
    const activeStream = await this.prismaClient.video.findFirst({
      where: {
        channelId: keyRecord.channelId,
        isLive: true,
      },
    });
    if (!activeStream) {
      return null;
    }
    return {
      videoId: activeStream.id,
      streamingKey: key,
    };
  }

  async finishStream(key: string): Promise<LiveEndResponseDto | null> {
    const keyRecord = await this.prismaClient.streamingKey.findFirst({
      where: {
        key,
      },
    });
    if (!keyRecord) {
      return null;
    }
    let activeStream = await this.prismaClient.video.findFirst({
      where: {
        channelId: keyRecord.channelId,
        isLive: true,
      },
    });
    if (!activeStream) {
      return null;
    }
    activeStream = await this.prismaClient.video.update({
      where: {
        id: activeStream.id,
      },
      data: {
        isLive: false,
      },
    });
    return {
      id: activeStream.id,
      isLive: activeStream.isLive,
    };
  }

  async resetStreamingKey(channelId: string): Promise<ResetStreamingKeyResponseDto | null> {
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
      streamingKey: updatedKey.key,
    };
  }
}
