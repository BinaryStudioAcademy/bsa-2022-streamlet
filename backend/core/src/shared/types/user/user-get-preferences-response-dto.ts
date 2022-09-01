import { Prisma } from '@prisma/client';

export type UserGetPreferencesDto = Prisma.UserGetPayload<{
  select: {
    videoPreferences: true;
  };
}>;
