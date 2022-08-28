import { ChatMessageBeforeTrimming, ChatMessageResponseDto } from '../types/types';

export const trimChatMessage = (message: ChatMessageBeforeTrimming): ChatMessageResponseDto => {
  return {
    id: message.id,
    text: message.text,
    createdAt: message.createdAt.toISOString(),
    author: {
      id: message.author.id,
      username: message.author.username,
      profile: {
        avatar: message.author.profile?.avatar ?? '',
      },
    },
  };
};
