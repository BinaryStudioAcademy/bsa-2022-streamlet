import { CreateVideoStatDto, CreateManyVideoStatsRequestDto } from '~/shared/types/types';

export type CreateManyVideoStatsDto = Pick<CreateVideoStatDto, 'userId'> & {
  data: CreateManyVideoStatsRequestDto;
};
