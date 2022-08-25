import { ChannelInfoBeforeTrimming } from '~/shared/types/types';

export interface ChannelCrudRepository {
  getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null>;
}
