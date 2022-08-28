import { ChatMessage } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { AmqpQueue, ChatMessageResponseDto } from 'shared/build';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import {
  ChatInfoBeforeTrimming,
  ChatMessageBeforeCreating,
  ChatMessageBeforeTrimming,
  CONTAINER_TYPES,
} from '~/shared/types/types';
import { ChatRepository } from '../port/chat-repository';

@injectable()
export class ChatService {
  constructor(
    @inject(CONTAINER_TYPES.ChatRepository) private chatRepository: ChatRepository,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) private amqpChannel: AmqpChannelPort,
  ) {}

  getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null> {
    return this.chatRepository.getChatMessagesByVideoId(id);
  }

  getChatMessagesById(id: string): Promise<ChatMessageBeforeTrimming | null> {
    return this.chatRepository.getChatMessagesById(id);
  }

  createChatMessage(chatMessageData: ChatMessageBeforeCreating): Promise<ChatMessage> {
    return this.chatRepository.createChatMessage(chatMessageData);
  }

  notifyChatRoom(body: { data: { message: ChatMessageResponseDto } }): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.NOTIFY_CHAT_ROOM,
      content: Buffer.from(JSON.stringify(body)),
    });
  }
}
