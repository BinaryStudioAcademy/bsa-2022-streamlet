import { inject, injectable } from 'inversify';
import { PrismaClient, Prisma } from '@prisma/client';
import {
  CONTAINER_TYPES,
  PopularVideoResponseDto,
  VideoWithReactionsAndComments,
  SearchByCategoriesResponseDtoType,
} from '~/shared/types/types';
import { DataVideo } from 'shared/build/common/types/video/base-video-response-dto.type';
import { trimPopular, trimVideo, trimVideoSearch } from '~/shared/helpers';
import { trimCommentsForReplies, trimVideoForQueryRaw, trimVideoWithComments } from '~/shared/helpers/trim-video';
import { Comment } from 'shared/build/common/types/comment';
import {
  BaseReplyRequestDto,
  CategorySearchRequestQueryDto,
  CreateReactionRequestDto,
  CreateReactionResponseDto,
  RecommendedVideosParams,
  ResponseVideoQueryRaw,
  StreamStatus,
  TagSearchRequestQueryDto,
  UpdateVideoInfoDto,
  UpdateVideoVisibilityDto,
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
import { VideoSearchFilters } from '~/core/video/port/video-search-filters';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getMyVideos(authorId: string): Promise<VideoWithReactionsAndComments[]> {
    return this.prismaClient.video.findMany({
      where: {
        channel: {
          authorId,
        },
        OR: [{ status: StreamStatus.FINISHED }, { status: StreamStatus.LIVE }],
      },
      orderBy: {
        publishedAt: 'desc',
      },
      include: {
        comments: true,
        reactions: true,
      },
    });
  }

  async deleteByIds(ids: string[]): Promise<VideoWithReactionsAndComments[]> {
    const deletedVideos = await this.prismaClient.video.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        comments: true,
        reactions: true,
      },
    });
    await this.prismaClient.video.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return deletedVideos;
  }
  async updateVisibility({
    videoIds,
    visibility,
  }: UpdateVideoVisibilityDto): Promise<VideoWithReactionsAndComments[] | null> {
    await this.prismaClient.video.updateMany({
      where: {
        id: {
          in: videoIds,
        },
      },
      data: {
        privacy: visibility,
      },
    });

    const updatedVideos = await this.prismaClient.video.findMany({
      where: {
        id: {
          in: videoIds,
        },
      },
      include: {
        comments: true,
        reactions: true,
      },
    });

    return updatedVideos;
  }
  updateVideoInfo({ videoId, title, description }: UpdateVideoInfoDto): Promise<VideoWithReactionsAndComments | null> {
    return this.prismaClient.video.update({
      where: {
        id: videoId,
      },
      data: {
        description,
        name: title,
      },
      include: {
        comments: true,
        reactions: true,
      },
    });
  }

  async addView(id: string): Promise<{ currentViews: number } | null> {
    try {
      const video = await this.prismaClient.video.update({
        data: {
          videoViews: {
            increment: 1,
          },
        },
        where: {
          id,
        },
      });
      return { currentViews: video.videoViews };
    } catch {
      return null;
    }
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
      this.prismaClient.video.count({ where: { ...{ privacy: StreamPrivacy.PUBLIC } } }),
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
            isEdited: true,
            isDeleted: true,
            author: {
              select: {
                id: true,
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
            category: {
              name: {
                in: category,
              },
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
            category: {
              name: {
                in: category,
              },
            },
          },
        },
      },
      take,
      skip,
      include: {
        categories: {
          select: {
            category: true,
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
            category: true,
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
            tag: {
              name: {
                in: tags,
              },
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

  async searchByCategories({
    skip,
    take,
    categories,
  }: CategorySearchRequestQueryDto): Promise<SearchByCategoriesResponseDtoType> {
    const [videos, total] = await this.prismaClient.$transaction([
      this.prismaClient.video.findMany({
        where: {
          privacy: StreamPrivacy.PUBLIC,
          categories: {
            some: {
              category: {
                name: {
                  in: categories,
                },
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
      }),
      this.prismaClient.video.count({
        where: {
          privacy: StreamPrivacy.PUBLIC,
          categories: {
            some: {
              category: {
                name: {
                  in: categories,
                },
              },
            },
          },
        },
      }),
    ]);
    return { list: videos, total };
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

  async getVideosBySearch(
    { searchText, duration, date, type, sortBy }: VideoSearch,
    videoSearchFilters?: VideoSearchFilters,
  ): Promise<DataVideo> {
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
        ...(videoSearchFilters?.excludeIds
          ? {
              id: {
                notIn: videoSearchFilters.excludeIds,
              },
            }
          : {}),
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
        ...(duration
          ? {
              duration: {
                gte: duration.gte,
                lte: duration.lte,
              },
            }
          : {}),
        ...(date
          ? {
              publishedAt: {
                gte: date,
              },
            }
          : {}),
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

  async getGeneralVideos(userId: string): Promise<DataVideo> {
    const videos: ResponseVideoQueryRaw[] = await this.prismaClient.$queryRaw`
        SELECT
          v.*,
          ch.id as ch_id,
          ch.name as ch_name,
          ch.avatar as ch_avatar
        FROM
          "Video" v
        INNER JOIN
          "Channel" ch
        ON
          ch.id = v."channelId"
        AND
          v."channelId"
        IN
          (SELECT
            sb."channelId"
          FROM
            "Subscription" sb
          WHERE
            sb."userId" = ${userId}
          )
        AND
          v.privacy = 'PUBLIC'
        ORDER BY v."publishedAt" DESC
        OFFSET 0 ROWS
        FETCH NEXT 6 ROWS ONLY
      `;

    const list = videos.map(trimVideoForQueryRaw);
    const total = videos.length;

    return {
      list,
      total,
    };
  }

  async getRecommendedVideos({ userId, skip, take }: RecommendedVideosParams): Promise<DataVideo> {
    if (userId) {
      const videos: ResponseVideoQueryRaw[] = await this.prismaClient.$queryRaw`
        SELECT
          v.*,
          ch.id as ch_id,
          ch.name as ch_name,
          ch.avatar as ch_avatar,
          (SELECT CAST(COUNT(*) AS INT)
            FROM
            (SELECT
              cv."categoryId" as "cid"
              FROM
                "CategoryToVideo" cv
              WHERE
                cv."videoId" = v.id
            INTERSECT
            SELECT
              cu."categoryId" as "cid"
            FROM
              "CategoryToUser" cu
            WHERE
              cu."userId" = ${userId}) as "_") as "index",
          (SELECT CAST(COUNT(*) AS INT)  FROM "Video" v WHERE v.privacy = 'PUBLIC') as total
        FROM 
          "Video" v
        INNER JOIN "Channel" ch
        ON ch.id = v."channelId"
        AND v.privacy = 'PUBLIC'
        ORDER BY
          "index" DESC,
          "videoViews" DESC
        OFFSET ${+skip} ROWS
        FETCH NEXT ${+take} ROWS ONLY
      `;

      const list = videos.map(trimVideoForQueryRaw);
      const total = videos[0].total;

      return {
        list,
        total,
      };
    }

    const [result, total] = await this.prismaClient.$transaction([
      this.prismaClient.video.findMany({
        where: {
          privacy: StreamPrivacy.PUBLIC,
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
        orderBy: {
          publishedAt: 'desc',
        },
        skip: Number(skip),
        take: Number(take),
      }),
      this.prismaClient.video.count({
        where: {
          privacy: StreamPrivacy.PUBLIC,
        },
      }),
    ]);

    const list = result.map(trimVideo);

    return {
      list,
      total,
    };
  }

  async getSimilarVideos(videoId: string, { skip, take }: Omit<RecommendedVideosParams, 'userId'>): Promise<DataVideo> {
    const IMPORTANCE_FACTOR = 10;
    const videos: ResponseVideoQueryRaw[] = await this.prismaClient.$queryRaw`
      SELECT
        v.*,
        ch.id as ch_id,
        ch.name as ch_name,
        ch.avatar as ch_avatar,
        (((SELECT ${IMPORTANCE_FACTOR} * CAST(COUNT(*) AS INT)
          FROM
          (SELECT cv."categoryId"
          FROM
            "CategoryToVideo" cv
          WHERE
            cv."videoId" = v.id
          INTERSECT
          SELECT
            cv."categoryId"
          FROM
            "CategoryToVideo" cv
          WHERE
            cv."videoId" = ${videoId}
          ) as _
        )) + ((SELECT CAST(COUNT(*) AS INT)
          FROM
          (SELECT
            UNNEST(string_to_array(LOWER(regexp_replace(v.name, '[[:punct:]]', '', 'g')), ' '))   
          INTERSECT
          SELECT
            UNNEST(string_to_array(LOWER(regexp_replace(curv.name, '[[:punct:]]', '', 'g')), ' '))
          FROM
            "Video" curv
          WHERE
            curv.id = ${videoId}
          ) as _
        ))) as matchResult
    FROM
      "Video" v
    INNER JOIN
      "Channel" ch
    ON
      v."channelId" = ch.id
    AND
      v.id != ${videoId}
    AND
      v.privacy = 'PUBLIC'
    ORDER BY
      matchResult DESC,
      v.id DESC
    OFFSET ${+skip} ROWS
    FETCH NEXT ${+take} ROWS ONLY
    `;

    const [total]: { total: number }[] = await this.prismaClient.$queryRaw`
      SELECT
        CAST(COUNT(*) AS INT) as total
      FROM
        "Video" tv
      WHERE
        tv.privacy = 'PUBLIC'
      AND
        tv.id != ${videoId}
      `;

    const list = videos.map(trimVideoForQueryRaw);

    return {
      list,
      total: total.total,
    };
  }
}
