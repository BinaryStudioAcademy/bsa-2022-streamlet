import { Prisma } from '@prisma/client';

export type TagSearchResponseDto = Prisma.TagGetPayload<{
  select: {
    videos: {
      select: {
        name: true;
      };
    };
  };
}>;
