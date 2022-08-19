import { type VideoComment } from './video-coment';

type VideoBaseResponseDto = {
  id: string;
  name: string;
  description: string;
  likeNum: number;
  disLikeNum: number;
  liveViews: number;
  isLive: boolean;
  isUserLikedVideo: boolean;
  isUserDislikedVideo: boolean;
  videoComments: VideoComment[];
  isUserSubscribeOnVideoChannel: boolean;
  videoViews: number;
  createdAt: string;
  channelId: string;
};

export { type VideoBaseResponseDto };
