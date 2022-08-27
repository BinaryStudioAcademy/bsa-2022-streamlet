import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChatRepository } from '~/core/chat/port/chat-repository';
import { ChatInfoBeforeTrimming } from '~/shared/types/types';

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
            createdAt: 'asc',
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
}
