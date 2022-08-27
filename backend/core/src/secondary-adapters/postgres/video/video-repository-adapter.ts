import { inject, injectable } from 'inversify';
import { VideoRepository } from '~/core/video/port/video-repository';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { BaseVideoResponseDto, DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { trimVideo } from '~/shared/helpers';
import { Comment } from 'shared/build/common/types/comment';
import { trimVideoWithComments } from '~/shared/helpers/trim-video';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getById(
    id: string,
  ): Promise<
    (BaseVideoResponseDto & { comments: Comment[]; description: string; likeNum: number; dislikeNum: number }) | null
  > {
    const video = await this.prismaClient.video.findUnique({
      where: {
        id,
      },
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        comments: {
          include: {
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });
    if (video === null) {
      return video;
    }
    const likeCount = await this.prismaClient.reaction.count({
      where: {
        videoId: id,
        isLike: true,
      },
    });
    const dislikeCount = await this.prismaClient.reaction.count({
      where: {
        videoId: id,
        isLike: false,
      },
    });
    return { ...trimVideoWithComments(video), likeNum: likeCount, dislikeNum: dislikeCount };
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
    const list = items.map(trimVideo);

    return {
      list,
      total,
    };
  }
}
