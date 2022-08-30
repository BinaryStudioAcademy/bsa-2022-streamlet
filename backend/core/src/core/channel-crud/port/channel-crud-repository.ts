import { Channel, User } from '@prisma/client';
import { ChannelInfoBeforeTrimming } from '~/shared/types/types';

export interface ChannelCrudRepository {
  getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null>;
  createDefaultForUser(user: User, channelName: string): Promise<Channel>;
}
