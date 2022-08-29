import { StreamingKey, Channel, User } from '@prisma/client';

export type StreamKeyResponseBeforeTrimming = StreamingKey & {
  channel: Channel & {
    author: User;
  };
};
