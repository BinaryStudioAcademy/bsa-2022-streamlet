import { inject, injectable } from 'inversify';
import { ChannelInfoBeforeTrimming, CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelCrudRepository } from '../port/channel-crud-repository';
import { ImageStorePort } from '../../common/port/image-store';
import {
  ChannelProfileUpdateDto,
  ChannelProfileUpdateMediaRequestDto,
  ChannelProfileUpdateResponseDto,
  ImageStorePresetType,
} from 'shared/build';
import { castToChannelProfileUpdateResponseDto } from './dtos/cast-to-channel-update-response-dtp';

@injectable()
export class ChannelCrudService {
  constructor(
    @inject(CONTAINER_TYPES.ChannelCrudRepository) private channelRepository: ChannelCrudRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) private imageStore: ImageStorePort,
  ) {}

  getChannelById({ id }: { id: string }): Promise<ChannelInfoBeforeTrimming | null> {
    return this.channelRepository.getChannelById(id);
  }

  async getChannelByAuthorId({ id }: { id: string }): Promise<ChannelProfileUpdateResponseDto | undefined> {
    const channel = await this.channelRepository.getChannelByAuthorId(id);
    if (!channel) {
      return;
    }

    return castToChannelProfileUpdateResponseDto(channel);
  }

  async isUserChannelOwner({ channelId, userId }: { channelId: string; userId: string }): Promise<boolean> {
    return (await this.channelRepository.getChannelById(channelId))?.authorId === userId;
  }

  async updateAvatar({
    id,
    base64Str,
    userId,
  }: ChannelProfileUpdateMediaRequestDto & {
    id: string;
    userId: string;
  }): Promise<ChannelProfileUpdateResponseDto> {
    const { url } = await this.imageStore.upload({
      base64Str,
      type: ImageStorePresetType.CHANNEL_AVATAR,
      userId,
    });

    const updatedChannel = await this.channelRepository.updateAvatar({
      id,
      url,
    });

    return castToChannelProfileUpdateResponseDto(updatedChannel);
  }

  async updateBanner({
    id,
    base64Str,
    userId,
  }: ChannelProfileUpdateMediaRequestDto & {
    id: string;
    userId: string;
  }): Promise<ChannelProfileUpdateResponseDto> {
    const { url } = await this.imageStore.upload({
      base64Str,
      type: ImageStorePresetType.CHANNEL_BANNER,
      userId,
    });

    const updatedChannel = await this.channelRepository.updateBanner({
      id,
      url,
    });

    return castToChannelProfileUpdateResponseDto(updatedChannel);
  }

  async updateSettings({
    id,
    name,
    description,
  }: ChannelProfileUpdateDto & {
    id: string;
  }): Promise<ChannelProfileUpdateResponseDto> {
    const updatedChannel = await this.channelRepository.updateSettings({
      id,
      name,
      description,
    });

    return castToChannelProfileUpdateResponseDto(updatedChannel);
  }

  async getAuthorByChannelId(id: string): Promise<string | undefined> {
    const channel = await this.channelRepository.getChannelById(id);
    return channel?.authorId;
  }
}
