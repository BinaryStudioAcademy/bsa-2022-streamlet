import { User } from '@prisma/client';
import { UserSignUpRequestDto, UserBaseResponseDto } from '~/shared/types/types';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserBaseResponseDto>;
}
