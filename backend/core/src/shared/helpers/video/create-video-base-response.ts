import { Reaction } from '@prisma/client';
import { VideoBaseResponseDto } from 'shared/build';

type createVideoBaseResponseInputType = {
  comments: { id: string; createdAt: Date; updatedAt: Date; text: string; authorId: string }[];
  reactions: Reaction[];
  id: string;
  name: string;
  description: string;
  videoViews: number;
  liveViews: number;
  createdAt: Date;
  isLive: boolean;
  channelId: string;
  videoPath: string;
};

const createVideoBaseResponse = (
  video: createVideoBaseResponseInputType,
  likeNum: number,
  disLikeNum: number,
  isUserSubscribeOnVideoChannel: boolean,
): VideoBaseResponseDto | null => {
  if (!video) {
    return null;
  }
  const userReaction = video.reactions.length ? video.reactions[0] : null;
  return {
    ...video,
    likeNum,
    disLikeNum,
    userReaction,
    isUserSubscribeOnVideoChannel,
  };
};

export { createVideoBaseResponse };
