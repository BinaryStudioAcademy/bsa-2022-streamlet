import { Channel, User } from '@prisma/client';

export interface ChannelCrudRepository {
  getChannelById(id: string): Promise<
    | (Channel & {
        author: User;
        _count: {
          subscriptions: number;
        };
      })
    | null
  >;
}
