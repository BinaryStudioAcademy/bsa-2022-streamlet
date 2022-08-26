import { Category, Channel, Tag, User, UserProfile, Video } from '@prisma/client';

export type ChannelInfoBeforeTrimming = Channel & {
  author: User & {
    profile: UserProfile | null;
  };
  videos: (Video & {
    tags: Tag[];
    categories: Category[];
  })[];
  _count: {
    subscriptions: number;
  };
};
