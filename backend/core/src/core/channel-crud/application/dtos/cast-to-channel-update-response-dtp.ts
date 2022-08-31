import { Channel } from '@prisma/client';
import { ChannelProfileUpdateResponseDto } from 'shared/build';

export const castToChannelProfileUpdateResponseDto = ({
  id,
  name,
  description,
  contactEmail,
  bannerImage,
  avatar,
}: Channel): ChannelProfileUpdateResponseDto => {
  return {
    id,
    name,
    description,
    contactEmail,
    bannerImage,
    avatar,
  };
};
