import { inject, injectable } from 'inversify';
import { ChannelInfoBeforeTrimming, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';

@injectable()
export class ChannelCrudService {
  private channelRepository: ChannelCrudRepository;

  constructor(@inject(CONTAINER_TYPES.ChannelCrudRepository) channelRepository: ChannelCrudRepository) {
    this.channelRepository = channelRepository;
  }

  getChannelById({ id }: { id: string }): Promise<ChannelInfoBeforeTrimming | null> {
    return this.channelRepository.getChannelById(id);
  }

  async getAuthorByChannelId(id: string): Promise<string | undefined> {
    const channel = await this.channelRepository.getChannelById(id);
    return channel?.authorId;
  }
}
