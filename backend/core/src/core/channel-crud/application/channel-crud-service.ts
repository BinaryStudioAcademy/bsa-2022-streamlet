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

  async isUserChannelOwner({ channelId, userId }: { channelId: string; userId: string }): Promise<boolean> {
    return (await this.channelRepository.getChannelById(channelId))?.authorId === userId;
  }

  async updateAvatar({
    id,
    base64Str,
  }: ChannelProfileUpdateMediaRequestDto & {
    id: string;
  }): Promise<ChannelProfileUpdateResponseDto> {
    const { url } = await this.imageStore.upload({
      base64Str,
      type: ImageStorePresetType.CHANNEL_AVATAR,
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
  }: ChannelProfileUpdateMediaRequestDto & {
    id: string;
  }): Promise<ChannelProfileUpdateResponseDto> {
    const { url } = await this.imageStore.upload({
      base64Str,
      type: ImageStorePresetType.CHANNEL_BANNER,
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
}
