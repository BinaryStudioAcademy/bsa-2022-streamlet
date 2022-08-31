import { ChatMessage, Video } from '@prisma/client';
import { ChatInfoBeforeTrimming, ChatMessageBeforeCreating, ChatMessageBeforeTrimming } from '~/shared/types/types';

export interface ChatRepository {
  getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null>;

  getVideoById(id: string): Promise<Video | null>;

  getChatMessageById(id: string): Promise<ChatMessageBeforeTrimming | null>;

  createChatMessage(chatMessage: ChatMessageBeforeCreating): Promise<ChatMessage>;
}
