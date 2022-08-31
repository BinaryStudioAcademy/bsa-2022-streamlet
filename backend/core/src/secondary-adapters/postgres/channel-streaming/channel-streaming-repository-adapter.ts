import { PrismaClient, StreamingKey, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { VideoWithChannelAndAuthorDto } from '~/shared/types/video/video-with-channel-and-author-dto.type';

@injectable()
export class ChannelStreamingRepositoryAdapter implements ChannelStreamingRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getVideo(props: Partial<Video>): Promise<Video | null> {
    return this.prismaClient.video.findFirst({
      where: {
        ...props,
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

  getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null> {
    return this.prismaClient.video.findUnique({
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
