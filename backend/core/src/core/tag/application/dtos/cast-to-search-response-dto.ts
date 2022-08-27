import { BaseVideoResponseDto } from 'shared/build';
import { VideoWithChannel } from '~/shared/types/video/video-with-channel-dto.type';

export const castToSearchByTagResponseDto = ({
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
    liveViews,
    videoViews,
    publishedAt: publishedAt.toString(),
    scheduledStreamDate: scheduledStreamDate.toString(),
    poster,
    duration,
    channel,
  };
};
