import { inject, injectable } from 'inversify';
import { PrismaClient, Prisma } from '@prisma/client';
import { CONTAINER_TYPES, PopularVideoResponseDto } from '~/shared/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { trimPopular, trimVideo, trimVideoSearch } from '~/shared/helpers';
import { trimCommentsForReplies, trimVideoWithComments } from '~/shared/helpers/trim-video';
import { Comment } from 'shared/build/common/types/comment';
import {
  BaseReplyRequestDto,
  CategorySearchRequestQueryDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  StreamStatus,
  TagSearchRequestQueryDto,
  VideoCommentRequestDto,
  VideoCommentResponseDto,
  VideoPaginationParams,
} from 'shared/build';
import { createVideoCommentResponse } from '~/shared/helpers/video/create-video-comment-response';
import { createAddReactionResponse } from '~/shared/helpers/video/create-add-reaction-response';
import { GetPopularInputType, GetPopularLiveInputType, VideoRepository } from '~/core/video/port/video-repository';
import { VideoSearch, VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';
import { VideoRepositoryFilters } from '~/core/video/port/video-repository-filters';
import { VideoExpandedInfo } from '~/shared/types/video/video-expanded-dto-before-trimming';
import { StreamPrivacy } from '~/shared/enums/stream/stream';

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
    return reaction !== null ? reaction.isLike : null;
  }

  async getById(id: string): Promise<VideoExpandedInfo | null> {
    const video = await this.prismaClient.video.findFirst({
      where: {
        id,
      },
      include: {
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
            _count: {
              select: {
                subscriptions: true,
              },
            },
          },
        },
        comments: {
          where: {
            parentId: null,
          },
          include: {
            author: {
              include: {
                profile: true,
              },
            },
            _count: {
              select: {
                childComments: true,
              },
            },
            commentReactions: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (video === null) {
      return video;
    }

    const { dislikeNum, likeNum } = await this.calculateReaction(video.id);
    const commentsWithReplies = video.comments.map((comment) => ({
      ...comment,
      repliesCount: comment._count.childComments,
    }));
    const videoCommentsReplies = { ...video, comments: commentsWithReplies };

    return { ...trimVideoWithComments(videoCommentsReplies), likeNum, dislikeNum };
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

  async getAll(queryParams?: {
    filters?: VideoRepositoryFilters;
    pagination?: VideoPaginationParams;
  }): Promise<DataVideo> {
    const [items, total] = await this.prismaClient.$transaction([
      this.prismaClient.video.findMany({
        where: {
          ...(queryParams?.filters?.streamStatus ? { status: queryParams.filters.streamStatus } : {}),
          ...{ privacy: StreamPrivacy.PUBLIC },
          ...(queryParams?.filters?.fromChannelSubscribedByUserWithId
            ? {
                channel: {
                  subscriptions: {
                    some: {
                      userId: queryParams.filters.fromChannelSubscribedByUserWithId,
                    },
                  },
                },
              }
            : {}),
        },
        include: {
          channel: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        ...(queryParams?.pagination?.skip && { skip: Number(queryParams?.pagination?.skip) }),
        ...(queryParams?.pagination?.take && { take: Number(queryParams?.pagination?.take) }),
        orderBy: {
          publishedAt: 'desc',
        },
      }),
      this.prismaClient.video.count(),
    ]);

    const list = items.map(trimVideo);

    return {
      list,
      total,
      lazyLoad: Boolean(queryParams?.pagination?.take),
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
            parentId: true,
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
          orderBy: {
            createdAt: 'desc',
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

  async getPopularVideoLength(category: string): Promise<number> {
    return this.prismaClient.video.count({
      where: {
        categories: {
          some: {
            name: {
              in: category,
            },
          },
        },
      },
    });
  }

  async getPopular({
    category,
    take,
    skip,
    lastPage,
    currentPage,
  }: GetPopularInputType): Promise<PopularVideoResponseDto> {
    const popularVideos = await this.prismaClient.video.findMany({
      where: {
        ...{ privacy: StreamPrivacy.PUBLIC },
        categories: {
          some: {
            name: {
              in: category,
            },
          },
        },
      },
      take,
      skip,
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        videoViews: 'desc',
      },
    });
    return trimPopular(popularVideos, lastPage, currentPage, category);
  }

  async getPopularLive({
    take,
    skip,
    lastPage,
    currentPage,
  }: GetPopularLiveInputType): Promise<PopularVideoResponseDto> {
    const popularVideos = await this.prismaClient.video.findMany({
      where: {
        ...{ privacy: StreamPrivacy.PUBLIC },
        status: StreamStatus.LIVE,
      },
      take,
      skip,
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        channel: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        videoViews: 'desc',
      },
    });
    return trimPopular(popularVideos, lastPage, currentPage, 'live');
  }

  searchByTags({ take, skip, tags }: TagSearchRequestQueryDto): Promise<VideoWithChannel[]> {
    return this.prismaClient.video.findMany({
      where: {
        ...{ privacy: StreamPrivacy.PUBLIC },
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

  searchByCategories({ skip, take, categories }: CategorySearchRequestQueryDto): Promise<VideoWithChannel[]> {
    return this.prismaClient.video.findMany({
      where: {
        ...{ privacy: StreamPrivacy.PUBLIC },
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

  async commentReactionByUser(commentId: string, userId: string): Promise<boolean | null> {
    const reaction = await this.prismaClient.commentReaction.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    return reaction !== null ? reaction.isLike : null;
  }

  async calculateCommentReaction(commentId: string): Promise<{ likeNum: number; dislikeNum: number }> {
    const likeCount = await this.prismaClient.commentReaction.count({
      where: {
        commentId,
        isLike: true,
      },
    });
    const dislikeCount = await this.prismaClient.commentReaction.count({
      where: {
        commentId,
        isLike: false,
      },
    });
    return {
      likeNum: likeCount,
      dislikeNum: dislikeCount,
    };
  }

  async addCommentReaction(
    request: CreateReactionRequestDto,
    videoId: string,
    userId: string,
  ): Promise<CreateReactionResponseDto | null> {
    const { isLike } = request;
    const videoComment = await this.prismaClient.videoComment.update({
      where: {
        id: videoId,
      },
      data: {
        commentReactions: {
          create: { isLike, userId },
        },
      },
      select: {
        commentReactions: {
          where: {
            userId,
          },
        },
      },
    });
    const { likeNum, dislikeNum } = await this.calculateReaction(videoId);
    return createAddReactionResponse(videoComment.commentReactions[0], likeNum, dislikeNum);
  }

  async removeCommentReactionAndAddNew(
    commentId: string,
    userId: string,
    isLike: boolean,
  ): Promise<CreateReactionResponseDto | null> {
    const userReaction = await this.commentReactionByUser(commentId, userId);
    if (userReaction === isLike) {
      await this.prismaClient.videoComment.update({
        where: {
          id: commentId,
        },
        data: {
          commentReactions: {
            deleteMany: [{ userId }],
          },
        },
      });
      const { likeNum, dislikeNum } = await this.calculateCommentReaction(commentId);
      return createAddReactionResponse(null, likeNum, dislikeNum);
    }

    const newReaction = await this.prismaClient.videoComment.update({
      where: {
        id: commentId,
      },
      data: {
        commentReactions: {
          deleteMany: [{ userId }],
          create: { isLike, userId },
        },
      },
      select: {
        commentReactions: {
          where: { userId },
        },
      },
    });
    const { likeNum, dislikeNum } = await this.calculateCommentReaction(commentId);
    return createAddReactionResponse(newReaction.commentReactions[0], likeNum, dislikeNum);
  }

  async getVideosBySearch({ searchText, duration, date, type, sortBy }: VideoSearch): Promise<DataVideo> {
    const queryOrderByObject = {
      orderBy: [
        ...sortBy.map((param) => param as Prisma.VideoOrderByWithRelationAndSearchRelevanceInput),
        {
          _relevance: {
            fields: ['name'],
            search: searchText,
            sort: 'desc',
          } as Prisma.VideoOrderByRelevanceInput,
        },
      ],
    };
    const queryObject = {
      where: {
        ...{ privacy: StreamPrivacy.PUBLIC },
        ...(searchText && {
          OR: [
            {
              name: {
                search: searchText,
              },
            },
            {
              description: {
                search: searchText,
              },
            },
            {
              channel: {
                name: {
                  search: searchText,
                },
              },
            },
          ],
        }),
        duration: {
          gte: duration.gte,
          lte: duration.lte,
        },
        publishedAt: {
          gte: date,
        },
        status: {
          in: type,
        },
      },
      include: {
        ...(type.length === 1
          ? {
              channel: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            }
          : { channel: true }),
      },
    };

    const result = await this.prismaClient.video.findMany({
      ...queryObject,
      ...queryOrderByObject,
    });

    const total = result.length;
    const list = result.map(trimVideoSearch);

    return {
      list,
      total,
    };
  }

  async getRepliesForComment(commentId: string): Promise<Comment[]> {
    const result = await this.prismaClient.videoComment.findMany({
      where: {
        parentId: commentId,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        commentReactions: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const repliesComments = trimCommentsForReplies(result);

    return repliesComments;
  }

  async addVideoCommentReply(request: BaseReplyRequestDto, authorId: string): Promise<Comment[]> {
    if (request.videoId) {
      await this.prismaClient.videoComment.create({
        data: {
          parentId: request.parentId,
          text: request.text,
          authorId,
          videoId: request.videoId,
        },
      });
    }

    return await this.getRepliesForComment(request.parentId);
  }

  async getAuthorById(id: string): Promise<string | undefined> {
    const searchResult = await this.prismaClient.video.findFirst({
      where: {
        id,
      },
      include: {
        channel: true,
      },
    });

    return searchResult?.channel.authorId;
  }
}
