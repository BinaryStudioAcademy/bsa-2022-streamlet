import { Channel, PrismaClient, User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class ChannelCrudRepositoryAdapter implements ChannelCrudRepository {
  constructor(@inject(CONTAINER_TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  async getChannelById(id: string): Promise<
    | (Channel & {
        author: User;
        _count: {
          subscriptions: number;
        };
      })
    | null
  > {
    return this.prismaClient.channel.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
    });
  }
}
