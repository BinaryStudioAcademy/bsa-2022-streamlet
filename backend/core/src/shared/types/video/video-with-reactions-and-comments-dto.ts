import { Prisma } from '@prisma/client';

export type VideoWithReactionsAndComments = Prisma.VideoGetPayload<{
  include: {
    comments: true;
    reactions: true;
  };
}>;
