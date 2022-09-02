import { BaseVideoResponseDto, Comment } from 'shared/build';

export type VideoExpandedInfo = BaseVideoResponseDto & {
  comments: Comment[];
  description: string;
  likeNum: number;
  videoPath: string;
  dislikeNum: number;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscriberCount: number;
  };
};
