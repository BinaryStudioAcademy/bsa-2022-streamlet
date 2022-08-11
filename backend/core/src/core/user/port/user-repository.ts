import { User } from '@prisma/client';
import { UserSignUpRequestDto, UserSignUpResponseDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;
}
