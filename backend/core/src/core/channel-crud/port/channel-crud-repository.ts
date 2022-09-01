import { Channel, User } from '@prisma/client';
import { ChannelInfoBeforeTrimming } from '~/shared/types/types';
import { ChannelProfileUpdateDto, ChannelProfileUpdateMediaDto } from 'shared/build';

export interface ChannelCrudRepository {
  getChannelById(id: string): Promise<ChannelInfoBeforeTrimming | null>;
  createDefaultForUser(user: User, channelName: string): Promise<Channel>;
  updateAvatar(updateAvatarDto: ChannelProfileUpdateMediaDto): Promise<Channel>;
  updateBanner(updateBannerDto: ChannelProfileUpdateMediaDto): Promise<Channel>;
  updateSettings(updateSettingsDto: ChannelProfileUpdateDto): Promise<Channel>;
}
