import { inject, injectable } from 'inversify';
import { PrismaClient, Video } from '@prisma/client';
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
} from '~/shared/types/types';
import { createVideoBaseResponse, createAddReactionResponse } from '~/shared/helpers';
import { VideoRepository } from '~/core/video/port/video-repository';

type reactionCountReturn = { likeNum: number; disLikeNum: number };

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getAll(): Promise<Video[]> {
    return this.prismaClient.video.findMany();
  }
  async getById(
    id: string,
    userId: string | undefined = undefined,
    isUserSubscribeOnVideoChannel = false,
  ): Promise<VideoBaseResponseDto | null> {
    const video = await this.prismaClient.video.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        liveViews: true,
        isLive: true,
        createdAt: true,
        videoViews: true,
        channelId: true,
        videoPath: true,
        comments: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            text: true,
            authorId: true,
          },
        },
        reactions: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!video) {
      return null;
    }
    const reactionCount = await this.calculateReaction(video.id);
    return createVideoBaseResponse(
      video,
      reactionCount.likeNum,
      reactionCount.disLikeNum,
      isUserSubscribeOnVideoChannel,
    );
  }
  async calculateReaction(videoId: string): Promise<reactionCountReturn> {
    const likes = await this.prismaClient.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
      select: {
        reactions: {
          where: {
            isLike: true,
          },
        },
      },
    });
    const dislikes = await this.prismaClient.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
      select: {
        reactions: {
          where: {
            isLike: false,
          },
        },
      },
    });
    return {
      likeNum: likes.reactions.length,
      disLikeNum: dislikes.reactions.length,
    };
  }
  async addReaction(request: CreateReactionRequestDto, videoId: string): Promise<CreateReactionResponseDto | null> {
    const { userId, isLike } = request;
    const user = await this.prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      return null;
    }
    const video = await this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        reactions: {
          createMany: { data: [{ isLike, userId }] },
        },
      },
      select: {
        reactions: {
          where: {
            userId,
          },
        },
      },
    });
    return createAddReactionResponse(video.reactions[0], 1, 2);
  }
}
