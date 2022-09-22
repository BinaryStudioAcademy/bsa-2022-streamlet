import { CreateVideoStatDto } from './create-video-stat-dto.type';

type CreateManyVideoStatsRequestDto = Record<
  string,
  {
    stats: Omit<CreateVideoStatDto, 'userId' | 'view'>[];
  }
>;

export { type CreateManyVideoStatsRequestDto };
