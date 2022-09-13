import { Category, Channel, Tag, User, UserProfile, Video } from '@prisma/client';

export type ChannelInfoBeforeTrimming = Channel & {
  author: User & {
    profile: UserProfile | null;
  };
  videos: (Video & {
    tags: Array<{
      tag: Tag;
    }>;
    categories: Array<{
      category: Category;
    }>;
  })[];
  _count: {
    subscriptions: number;
  };
};
