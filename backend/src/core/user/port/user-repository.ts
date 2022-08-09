import { User } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';
import { UserSignUpRequestDto, UserSignUpResponseDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto>;

  uploadAvatar(base64Str: string): Promise<UploadApiResponse>;
}
