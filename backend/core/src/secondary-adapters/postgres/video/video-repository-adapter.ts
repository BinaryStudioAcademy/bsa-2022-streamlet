import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { BaseVideoResponseDto, DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { trimVideo } from '~/shared/helpers';
import { Comment } from 'shared/build/common/types/comment';
import { trimVideoWithComments } from '~/shared/helpers/trim-video';
import {
  CategorySearchRequestQueryDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  TagSearchRequestQueryDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
} from 'shared/build';
import { createVideoCommentResponse } from '~/shared/helpers/video/create-video-comment-response';
import { createAddReactionResponse } from '~/shared/helpers/video/create-add-reaction-response';
import { VideoRepository } from '~/core/video/port/video-repository';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async reactionByUser(videoId: string, userId: string): Promise<boolean | null> {
    const reaction = await this.prismaClient.reaction.findFirst({
      where: {
        userId,
        videoId,
      },
    });
    return reaction ? reaction.isLike : null;
  }

  async getById(id: string): Promise<
    | (BaseVideoResponseDto & {
        comments: Comment[];
        description: string;
        likeNum: number;
        dislikeNum: number;
        videoPath: string;
      })
    | null
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
    const { dislikeNum, likeNum } = await this.calculateReaction(video.id);
    return { ...trimVideoWithComments(video), likeNum, dislikeNum };
  }

  async calculateReaction(videoId: string): Promise<{ likeNum: number; dislikeNum: number }> {
    const likeCount = await this.prismaClient.reaction.count({
      where: {
        videoId,
        isLike: true,
      },
    });
    const dislikeCount = await this.prismaClient.reaction.count({
      where: {
        videoId,
        isLike: false,
      },
    });
    return {
      likeNum: likeCount,
      dislikeNum: dislikeCount,
    };
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

  async removeReactionAndAddNew(
    videoId: string,
    userId: string,
    isLike: boolean,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.reactionByUser(videoId, userId);
    if (userReaction === isLike) {
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

  searchByTags({ take, skip, tags }: TagSearchRequestQueryDto): Promise<VideoWithChannel[]> {
    return this.prismaClient.video.findMany({
      where: {
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      },
      take,
      skip,
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
  }

  searchByCatergories({ skip, take, categories }: CategorySearchRequestQueryDto): Promise<VideoWithChannel[]> {
    return this.prismaClient.video.findMany({
      where: {
        categories: {
          some: {
            name: {
              in: categories,
            },
          },
        },
      },
      take,
      skip,
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
  }
}
