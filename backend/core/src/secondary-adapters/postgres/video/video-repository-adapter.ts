import { inject, injectable } from 'inversify';
import { VideoRepository } from '~/core/video/port/video-repository';
import { PrismaClient, Reaction } from '@prisma/client';
import {
  CONTAINER_TYPES,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  VideoBaseResponseDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from '~/shared/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { createAddReactionResponse, createVideoBaseResponse, createVideoCommentResponse } from '~/shared/helpers';

type reactionCountReturn = { likeNum: number; dislikeNum: number };

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

  async getById(
    id: string,
    userId: string | undefined = undefined,
    isUserSubscribeOnVideoChannel = false,
  ): Promise<VideoBaseResponseDto | null> {
    const video = await this.prismaClient.video.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            text: true,
            author: {
              select: {
                username: true,
                profile: true,
              },
            },
          },
        },
        reactions: {
          where: {
            userId,
          },
        },
      },
    });
    if (!video) {
      return null;
    }
    const { likeNum, dislikeNum } = await this.calculateReaction(video.id);
    return createVideoBaseResponse({
      video,
      likeNum,
      dislikeNum,
      isUserSubscribeOnVideoChannel,
    });
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
      dislikeNum: dislikes.reactions.length,
    };
  }

  async addComment(request: VideoCommentRequestDto, authorId: string): Promise<VideoCommentResponseDto | null> {
    const { videoId, text } = request;
    const comments = await this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        comments: {
          create: { text, authorId },
        },
      },
      select: {
        comments: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            text: true,
            author: {
              select: {
                username: true,
                profile: true,
              },
            },
          },
        },
      },
    });
    if (!comments) {
      return null;
    }
    const newCommentResponse = createVideoCommentResponse(comments.comments);
    return { videoId, comments: newCommentResponse };
  }

  async addReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const { isLike } = request;
    const video = await this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        reactions: {
          create: { isLike, userId },
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
    const { likeNum, dislikeNum } = await this.calculateReaction(videoId);
    return createAddReactionResponse(video.reactions[0], likeNum, dislikeNum);
  }

  async hasUserReacted(userId: string, videoId: string): Promise<Reaction[] | undefined> {
    const userReaction = await this.prismaClient.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        reactions: {
          where: {
            userId,
          },
        },
      },
    });
    return userReaction?.reactions;
  }

  async removeReactionAndAddNew(
    videoId: string,
    userId: string,
    isLike: boolean,
    userReaction: Reaction,
  ): Promise<CreateReactionResponseDto | null> {
    if (userReaction.isLike === isLike) {
      await this.prismaClient.video.update({
        where: {
          id: videoId,
        },
        data: {
          reactions: {
            deleteMany: [{ userId }],
          },
        },
      });
      const { likeNum, dislikeNum } = await this.calculateReaction(videoId);
      return createAddReactionResponse(null, likeNum, dislikeNum);
    }

    const newReaction = await this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        reactions: {
          deleteMany: [{ userId }],
          create: { isLike, userId },
        },
      },
      select: {
        reactions: {
          where: { userId },
        },
      },
    });
    const { likeNum, dislikeNum } = await this.calculateReaction(videoId);
    return createAddReactionResponse(newReaction.reactions[0], likeNum, dislikeNum);
  }
}
