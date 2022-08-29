import { ChatMessage, UserProfile, User } from '@prisma/client';

export type ChatMessageBeforeTrimming = ChatMessage & {
  author: User & {
    profile: UserProfile | null;
  };
};
