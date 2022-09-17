import { CreateVideoStatDto } from './create-video-stat-dto.type';

type CreateVideoStatRequestDto = {
  stats: Omit<CreateVideoStatDto, 'userId' | 'videoId' | 'isLive' | 'wasSubscribed' | 'source'>[];
};

export { type CreateVideoStatRequestDto };
