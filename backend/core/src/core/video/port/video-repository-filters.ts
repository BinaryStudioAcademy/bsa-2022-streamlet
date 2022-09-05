import { StreamStatus } from '@prisma/client';

export type VideoRepositoryFilters = {
  streamStatus?: StreamStatus;
  fromChannelSubscribedByUserWithId?: string;
};
