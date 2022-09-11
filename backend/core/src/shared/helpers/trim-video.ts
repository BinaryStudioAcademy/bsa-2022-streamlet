import { User, UserProfile, Video, VideoComment, CommentReaction } from '@prisma/client';
import { BaseVideoResponseDto, StreamStatus } from 'shared/build';
import { Comment } from 'shared/build/common/types/comment';

export const trimVideoToBase = (
  video: Video & {
    channel: {
      id: string;
      name: string;
      avatar: string;
    };
  },
): BaseVideoResponseDto => {
  const { id, poster, scheduledStreamDate, status, name, publishedAt, duration, videoViews, liveViews, channel } =
    video;
  return {
    id,
    poster,
    scheduledStreamDate: scheduledStreamDate.toISOString(),
    status: status as StreamStatus,
    name,
    publishedAt: publishedAt?.toISOString() ?? '',
    duration,
    videoViews,
    liveViews,
    channel,
  };
};

export const trimVideoWithComments = (
  video: Video & {
    channel: {
      id: string;
      name: string;
      avatar: string;
      _count: {
        subscriptions: number;
      };
    };
    comments: (VideoComment & {
      author: User & { profile: UserProfile | null };
      commentReactions: CommentReaction[];
      repliesCount: number;
    })[];
  },
): BaseVideoResponseDto & {
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscriberCount: number;
  };
  comments: Comment[];
  description: string;
  videoPath: string;
  isChatEnabled: boolean;
} => {
  const {
    id,
    poster,
    scheduledStreamDate,
    status,
    name,
    publishedAt,
    duration,
    videoViews,
    liveViews,
    channel,
    comments,
    description,
    videoPath,
    isChatEnabled,
  } = video;
  return {
    id,
    poster,
    videoPath,
    scheduledStreamDate: scheduledStreamDate.toISOString(),
    status: status as StreamStatus,
    name,
    publishedAt: publishedAt?.toISOString() ?? '',
    duration,
    videoViews,
    liveViews,
    channel: {
      avatar: channel.avatar,
      id: channel.id,
      name: channel.name,
      subscriberCount: channel._count.subscriptions,
    },
    comments: comments.map((comment) => ({
      dateAdded: comment.createdAt,
      id: comment.id,
      parentId: comment.parentId,
      repliesCount: comment.repliesCount,
      text: comment.text,
      authorId: comment.author.id,
      userName: comment.author.username,
      avatar: comment.author.profile?.avatar,
      firstName: comment.author.profile?.firstName,
      lastName: comment.author.profile?.lastName,
      likeNum: calculateReactions(comment.commentReactions, true),
      dislikeNum: calculateReactions(comment.commentReactions, false),
      commentReactions: comment.commentReactions.map((item) => ({ isLike: item.isLike, userId: item.userId })),
    })),
    description,
    isChatEnabled,
  };
};

export const trimCommentsForReplies = (
  comments: (VideoComment & {
    commentReactions: CommentReaction[];
    author: User & {
      profile: UserProfile | null;
    };
  })[],
): Comment[] => {
  const result = comments.map((comment) => ({
    id: comment.id,
    parentId: comment.parentId,
    avatar: comment.author.profile?.avatar,
    authorId: comment.author.id,
    userName: comment.author.username,
    firstName: comment.author.profile?.firstName,
    lastName: comment.author.profile?.lastName,
    text: comment.text,
    dateAdded: comment.createdAt,
    likeNum: calculateReactions(comment.commentReactions, true),
    dislikeNum: calculateReactions(comment.commentReactions, false),
    commentReactions: comment.commentReactions.map((item) => ({ isLike: item.isLike, userId: item.userId })),
  }));

  return result;
};

const calculateReactions = (commentReactions: CommentReaction[], isLike: boolean): number => {
  const likeCount = commentReactions.filter((item) => item.isLike === isLike);
  return likeCount.length;
};
