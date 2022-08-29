import { User, UserProfile, Video, VideoComment } from '@prisma/client';
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
    scheduledStreamDate: scheduledStreamDate.toISOString(),
    status,
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
    };
    comments: (VideoComment & { author: User & { profile: UserProfile | null } })[];
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
    scheduledStreamDate: scheduledStreamDate.toISOString(),
    status,
    name,
    publishedAt: publishedAt?.toISOString() ?? '',
    duration,
    videoViews,
    liveViews,
    channel,
    comments: comments.map((comment) => ({
      dateAdded: comment.createdAt,
      id: comment.id,
      text: comment.text,
      userName: comment.author.username,
      avatar: comment.author.profile?.avatar,
      firstName: comment.author.profile?.firstName,
      lastName: comment.author.profile?.lastName,
    })),
    description,
  };
};
