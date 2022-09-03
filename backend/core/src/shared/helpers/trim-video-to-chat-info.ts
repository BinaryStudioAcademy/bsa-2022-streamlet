import { ChatInfoBeforeTrimming, ChatInfoResponseDto } from '../types/types';

export const trimVideoToChatInfo = (video: ChatInfoBeforeTrimming): ChatInfoResponseDto => {
  return {
    id: video.id,
    isChatEnabled: video.isChatEnabled,
    initialMessages: {
      list: video.chatMessages.map((message) => ({
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
      })),
      total: video.chatMessages.length,
    },
  };
};
