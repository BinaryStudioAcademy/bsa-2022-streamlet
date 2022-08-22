import { Channel, User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';

@injectable()
export class ChannelCrudService {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudRepository) private channelRepository: ChannelCrudRepository) {}

  getChannelById(id: string): Promise<
    | (Channel & {
        author: User;
        _count: {
          subscriptions: number;
        };
      })
    | null
  > {
    return this.channelRepository.getChannelById(id);
  }
}
