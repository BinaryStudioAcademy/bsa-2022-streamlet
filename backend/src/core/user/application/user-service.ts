import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { UserSignUpResponseDto } from 'shared/build';
import { UploadApiResponse } from 'cloudinary';

@injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(@inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userRepository.createUser(userRequestDto);
  }

  uploadAvatar(base64Str: string): Promise<UploadApiResponse> {
    return this.userRepository.uploadAvatar(base64Str);
  }
}
