import { StreamingStatus } from '@prisma/client';

export type VideoRepositoryFilters = {
  streamingStatus?: StreamingStatus;
  fromChannelSubscribedByUserWithId?: string;
};
