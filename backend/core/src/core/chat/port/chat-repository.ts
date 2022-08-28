import { ChatMessage } from '@prisma/client';
import { ChatInfoBeforeTrimming, ChatMessageBeforeCreating, ChatMessageBeforeTrimming } from '~/shared/types/types';

export interface ChatRepository {
  getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null>;

  getChatMessagesById(id: string): Promise<ChatMessageBeforeTrimming | null>;

  createChatMessage(chatMessage: ChatMessageBeforeCreating): Promise<ChatMessage>;
}
