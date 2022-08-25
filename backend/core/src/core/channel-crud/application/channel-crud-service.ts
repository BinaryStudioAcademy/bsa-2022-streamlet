import { inject, injectable } from 'inversify';
import { ChannelInfoBeforeTrimming, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';

@injectable()
export class ChannelCrudService {
  constructor(@inject(CONTAINER_TYPES.ChannelCrudRepository) private channelRepository: ChannelCrudRepository) {}

  getChannelById({ id }: { id: string }): Promise<ChannelInfoBeforeTrimming | null> {
    return this.channelRepository.getChannelById(id);
  }
}
