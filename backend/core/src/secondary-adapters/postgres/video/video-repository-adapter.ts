import { inject, injectable } from 'inversify';
import { VideoRepository } from '~/core/video/port/video-repository';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getAll(): Promise<DataVideo> {
    const items = await this.prismaClient.video.findMany({
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
    const total = items.length;
    const list = items.map(
      ({ id, poster, scheduledStreamDate, status, name, publishedAt, duration, videoViews, liveViews, channel }) => ({
        id,
        poster,
        scheduledStreamDate: scheduledStreamDate.toString(),
        status,
        name,
        publishedAt: publishedAt.toString(),
        duration,
        videoViews,
        liveViews,
        channel,
      }),
    );

    return {
      list,
      total,
    };
  }
}
