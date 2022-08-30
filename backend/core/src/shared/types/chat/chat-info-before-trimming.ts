import { Video, ChatMessage, UserProfile, User } from '@prisma/client';

export type ChatInfoBeforeTrimming = Video & {
  chatMessages: (ChatMessage & {
    author: User & {
      profile: UserProfile | null;
    };
  })[];
};
