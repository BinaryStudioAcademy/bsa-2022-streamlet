import { Category, Tag, Video } from '@prisma/client';

export type VideoStreamResponseBeforeTrimming = Video & {
  categories: Category[];
  tags: Tag[];
};
