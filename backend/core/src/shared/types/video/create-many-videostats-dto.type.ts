import { CreateVideoStatDto, CreateVideoStatRequestDto } from '~/shared/types/types';

export type CreateManyVideoStatsDto = Pick<
  CreateVideoStatDto,
  'videoId' | 'userId' | 'isLive' | 'wasSubscribed' | 'source'
> &
  CreateVideoStatRequestDto;
