import { Video } from '@prisma/client';
import { VideoBaseResponseDto } from 'shared/build';

const createVideoBaseResponse = (video: Video, likeNum: number, disLikeNum: number): VideoBaseResponseDto | null => {
  if (!video) {
    return null;
  }
  const { id, createdAt, name, description, videoViews, isLive, liveViews, channelId } = video;

  return {
    id,
    createdAt: createdAt.toLocaleString(),
    name,
    description,
    videoViews,
    isLive,
    liveViews,
    channelId,
    likeNum,
    disLikeNum,
  };
};

export { createVideoBaseResponse };
