import { StreamPrivacy, StreamStatus, VideoStreamResponseDto } from 'shared/build';
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
  isChatEnabled,
}: VideoStreamResponseBeforeTrimming): VideoStreamResponseDto => {
  return {
    id,
    name,
    description,
    status: status as StreamStatus,
    privacy: privacy as StreamPrivacy,
    isReadyToStream,
    publishedAt: publishedAt?.toISOString() ?? '',
    scheduledStreamDate: scheduledStreamDate?.toISOString() ?? '',
    poster,
    videoPath,
    liveViews,
    videoViews,
    tags: tags.map(({ tag }) => ({ ...tag })),
    categories: categories.map(({ category }) => ({ ...category })),
    channelId,
    isChatEnabled,
  };
};

export { castToVideoStreamResponseDto };
