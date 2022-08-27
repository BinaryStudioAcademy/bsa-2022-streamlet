import { BaseVideoResponseDto } from 'shared/build';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';

export const castToSearchByCategoryResponseDto = ({
  id,
  name,
  status,
  publishedAt,
  scheduledStreamDate,
  poster,
  duration,
  liveViews,
  videoViews,
  channel,
}: VideoWithChannel): BaseVideoResponseDto => {
  return {
    id,
    name,
    status,
    publishedAt: publishedAt.toString(),
    scheduledStreamDate: scheduledStreamDate.toString(),
    liveViews,
    videoViews,
    poster,
    duration,
    channel,
  };
};
