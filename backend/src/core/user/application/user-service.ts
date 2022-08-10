import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { UserSignUpResponseDto, UserUploadResponseDto } from 'shared/build';
import { UploadApiResponseDto } from '~/shared/dtos/cloudinary/upload-api-response-dto';

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

  async uploadAvatar(base64Str: string): Promise<UserUploadResponseDto> {
    return UploadApiResponseDto(await this.userRepository.uploadAvatar(base64Str));
  }
}
