import { ChatMessage, PrismaClient, Video } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChatRepository } from '~/core/chat/port/chat-repository';
import { ChatInfoBeforeTrimming, ChatMessageBeforeCreating, ChatMessageBeforeTrimming } from '~/shared/types/types';

@injectable()
export class ChatRepositoryAdapter implements ChatRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async getChatMessagesByVideoId(id: string): Promise<ChatInfoBeforeTrimming | null> {
    return this.prismaClient.video.findUnique({
      where: {
        id,
      },
      include: {
        chatMessages: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });
  }

  async createChatMessage(chatMessage: ChatMessageBeforeCreating): Promise<ChatMessage> {
    const message = await this.prismaClient.chatMessage.create({
      data: { ...chatMessage },
    });

    return message;
  }

  async getVideoById(id: string): Promise<Video | null> {
    return this.prismaClient.video.findUnique({
      where: {
        id,
      },
    });
  }

  async getChatMessageById(id: string): Promise<ChatMessageBeforeTrimming | null> {
    return this.prismaClient.chatMessage.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });
  }
}
