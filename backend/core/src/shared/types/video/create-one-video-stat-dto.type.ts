import { CreateVideoStatDto } from '~/shared/types/types';

export type CreateOneVideoStatDto = Pick<CreateVideoStatDto, 'userId'> & {
  stat: Omit<CreateVideoStatDto, 'userId'>;
};
