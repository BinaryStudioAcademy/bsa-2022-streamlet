import { User } from '@prisma/client';
import { UserBaseResponseDto } from '../types/types';

export function trimUser(user: User): UserBaseResponseDto {
  return {
    email: user.email,
    id: user.id,
  };
}
