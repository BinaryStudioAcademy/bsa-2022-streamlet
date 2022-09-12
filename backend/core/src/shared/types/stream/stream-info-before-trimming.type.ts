import { Category, Tag, Video } from '@prisma/client';

export type VideoStreamResponseBeforeTrimming = Video & {
  categories: Array<{ category: Category }>;
  tags: Array<{ tag: Tag }>;
};
