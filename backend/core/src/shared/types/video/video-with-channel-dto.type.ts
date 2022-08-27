import { Prisma } from '@prisma/client';

export type VideoWithChannel = Prisma.VideoGetPayload<{
  include: {
    channel: {
      select: {
        id: true;
        name: true;
        avatar: true;
      };
    };
  };
}>;
