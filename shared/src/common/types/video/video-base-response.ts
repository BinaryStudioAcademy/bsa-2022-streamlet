import { type VideoComment } from './video-coment';
import { VideoReaction } from '~/common/types/video/video-reaction';

type VideoBaseResponseDto = {
  id: string;
  name: string;
  description: string;
  likeNum: number;
  disLikeNum: number;
  liveViews: number;
  videoPath: string;
  userReaction: VideoReaction | null;
  comments: VideoComment[];
  isUserSubscribeOnVideoChannel: boolean;
  videoViews: number;
  createdAt: Date;
  channelId: string;
};

export { type VideoBaseResponseDto };
