import { ChatInfoBeforeTrimming } from '~/shared/types/types';

export interface ChatRepository {
  getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null>;
}
