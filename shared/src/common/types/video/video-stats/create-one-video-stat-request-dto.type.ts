import { CreateVideoStatDto } from './create-video-stat-dto.type';

type CreateOneVideoStatRequestDto = {
  stat: Omit<CreateVideoStatDto, 'userId'>;
};

export { type CreateOneVideoStatRequestDto };
