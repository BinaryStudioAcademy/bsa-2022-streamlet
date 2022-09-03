import { User, UserProfile, Video, VideoComment, CommentReaction } from '@prisma/client';
import { BaseVideoResponseDto } from 'shared/build';
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
    scheduledStreamDate: scheduledStreamDate.toString(),
    status,
    name,
    publishedAt: publishedAt.toString(),
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
    };
    comments: (VideoComment & {
      author: User & { profile: UserProfile | null };
      commentReactions: CommentReaction[];
      repliesCount: number;
    })[];
  },
): BaseVideoResponseDto & { comments: Comment[]; description: string; videoPath: string } => {
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
  } = video;
  return {
    id,
    poster,
    videoPath,
    scheduledStreamDate: scheduledStreamDate.toString(),
    status,
    name,
    publishedAt: publishedAt.toString(),
    duration,
    videoViews,
    liveViews,
    channel,
    comments: comments.map((comment) => ({
      dateAdded: comment.createdAt,
      id: comment.id,
      parentId: comment.parentId,
      repliesCount: comment.repliesCount,
      text: comment.text,
      userName: comment.author.username,
      avatar: comment.author.profile?.avatar,
      firstName: comment.author.profile?.firstName,
      lastName: comment.author.profile?.lastName,
      likeNum: calculateReactions(comment.commentReactions, true),
      dislikeNum: calculateReactions(comment.commentReactions, false),
    })),
    description,
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
  const res = comments.map((comment) => ({
    id: comment.id,
    parentId: comment.parentId,
    avatar: comment.author.profile?.avatar,
    userName: comment.author.username,
    firstName: comment.author.profile?.firstName,
    lastName: comment.author.profile?.lastName,
    text: comment.text,
    dateAdded: comment.createdAt,
    likeNum: calculateReactions(comment.commentReactions, true),
    dislikeNum: calculateReactions(comment.commentReactions, false),
  }));

  return res;
};

const calculateReactions = (commentReactions: CommentReaction[], isLike: boolean): number => {
  const likeCount = commentReactions.filter((item) => item.isLike === isLike);
  return likeCount.length;
};
