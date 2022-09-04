import { BaseVideoResponseDto, Comment } from 'shared/build';

export type VideoExpandedInfo = BaseVideoResponseDto & {
  comments: Comment[];
  description: string;
  likeNum: number;
  videoPath: string;
  dislikeNum: number;
  isChatEnabled: boolean;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscriberCount: number;
  };
};
