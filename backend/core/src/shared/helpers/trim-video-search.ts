import { Channel, Video } from '@prisma/client';
import { BaseVideoResponseDto, StreamStatus } from 'shared/build';

export const trimVideoSearch = (
  video: Video & {
    channel: Channel;
  },
): BaseVideoResponseDto => {
  const { id, poster, scheduledStreamDate, status, name, publishedAt, duration, videoViews, liveViews, channel } =
    video;
  return {
    id,
    poster,
    scheduledStreamDate: scheduledStreamDate.toString(),
    status: status as StreamStatus,
    name,
    publishedAt: publishedAt?.toISOString() ?? '',
    duration,
    videoViews,
    liveViews,
    channel: {
      id: channel.id,
      name: channel.name,
      avatar: channel.avatar,
    },
  };
};
