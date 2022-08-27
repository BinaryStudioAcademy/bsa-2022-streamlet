import { inject, injectable } from 'inversify';
import { ChatInfoBeforeTrimming, CONTAINER_TYPES } from '~/shared/types/types';
import { ChatRepository } from '../port/chat-repository';

@injectable()
export class ChatService {
  constructor(@inject(CONTAINER_TYPES.ChatRepository) private chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null> {
    return this.chatRepository.getChatMessagesByVideoId(id);
  }
}
