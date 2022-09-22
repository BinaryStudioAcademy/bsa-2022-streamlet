import { CreateChannelStatDto } from './create-channel-stat-dto.type';

type CreateChannelStatRequestDto = {
  stats: Omit<CreateChannelStatDto, 'userId' | 'channelId' | 'source'>;
};

export { type CreateChannelStatRequestDto };
