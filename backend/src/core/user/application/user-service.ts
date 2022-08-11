import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { UserSignUpResponseDto } from 'shared/build';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userRepository.createUser(userRequestDto);
  }

  createRefreshToken(userId: string): Promise<string> {
    return this.refreshTokenRepository.createForUser(userId);
  }
}
