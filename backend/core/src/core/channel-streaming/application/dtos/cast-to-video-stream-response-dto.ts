import { VideoStreamResponseDto } from 'shared/build';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';

const castToVideoStreamResponseDto = ({
  id,
  name,
  description,
  status,
  isReadyToStream,
  publishedAt,
  scheduledStreamDate,
  poster,
  videoPath,
  liveViews,
  videoViews,
  tags,
  categories,
  channelId,
  privacy,
}: VideoStreamResponseBeforeTrimming): VideoStreamResponseDto => {
  return {
    id,
    name,
    description,
    status,
    privacy,
    isReadyToStream,
    publishedAt: publishedAt?.toISOString() ?? '',
    scheduledStreamDate: scheduledStreamDate?.toISOString() ?? '',
    poster,
    videoPath,
    liveViews,
    videoViews,
    tags,
    categories,
    channelId,
  };
};

export { castToVideoStreamResponseDto };
