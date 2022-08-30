import { Channel, User, Video } from '@prisma/client';

export type VideoWithChannelAndAuthorDto = Video & {
  channel: Channel & {
    author: User;
  };
};
