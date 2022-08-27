import { inject, injectable } from 'inversify';
import { VideoRepository } from '~/core/video/port/video-repository';
import { ChannelInfoBeforeTrimming, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';

@injectable()
export class ChannelCrudService {
  private channelRepository: ChannelCrudRepository;
  private videoRepository: VideoRepository;

  constructor(
    @inject(CONTAINER_TYPES.ChannelCrudRepository) channelRepository: ChannelCrudRepository,
    @inject(CONTAINER_TYPES.VideoRepository) videoRepository: VideoRepository,
  ) {
    this.channelRepository = channelRepository;
    this.videoRepository = videoRepository;
  }

  getChannelById({ id }: { id: string }): Promise<ChannelInfoBeforeTrimming | null> {
    return this.channelRepository.getChannelById(id);
  }

  async getAuthorByChannelId(id: string): Promise<string | undefined> {
    const channel = await this.channelRepository.getChannelById(id);
    return channel?.authorId;
  }

  async getAuthorByVideoId(id: string): Promise<string | undefined> {
    return this.videoRepository.getAuthorById(id);
  }
}
