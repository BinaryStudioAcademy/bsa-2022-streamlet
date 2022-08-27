import { Reaction, UserProfile } from '@prisma/client';

type videoFromDbType = {
  comments: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    author: { username: string; profile: UserProfile | null };
  }[];
  reactions: Reaction[];
  id: string;
  name: string;
  status: string;
  description: string;
  videoViews: number;
  liveViews: number;
  createdAt: Date;
  channelId: string;
  videoPath: string;
};

export type createBaseVideoResponse = {
  video: videoFromDbType;
  likeNum: number;
  dislikeNum: number;
  isUserSubscribeOnVideoChannel: boolean;
};
