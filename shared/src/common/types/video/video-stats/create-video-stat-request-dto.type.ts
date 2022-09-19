import { CreateVideoStatDto } from './create-video-stat-dto.type';

type CreateVideoStatRequestDto = {
  stats: Omit<CreateVideoStatDto, 'userId'>[];
};

export { type CreateVideoStatRequestDto };
