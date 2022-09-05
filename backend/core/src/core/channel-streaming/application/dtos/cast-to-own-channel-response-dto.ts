import { Channel } from '@prisma/client';
import { OwnChannelResponseDto } from 'shared/build';

const castToOwnChannelDto = ({
  id,
  name,
  avatar,
  description,
  contactEmail,
  bannerImage,
  authorId,
  createdAt,
}: Channel): OwnChannelResponseDto => {
  return {
    id,
    name,
    avatar,
    description,
    contactEmail,
    bannerImage,
    authorId,
    createdAt: createdAt.toISOString(),
  };
};

export { castToOwnChannelDto };
