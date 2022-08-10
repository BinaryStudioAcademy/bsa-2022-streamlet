import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { CloudinaryPresetType, UserSignUpResponseDto, UserUploadRequestDto, UserUploadResponseDto } from 'shared/build';
import { UploadApiResponseDto } from '~/shared/dtos/cloudinary/upload-api-response-dto';
import { CloudinaryPort } from '~/core/common/port/cloudinary';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private cloudinary: CloudinaryPort;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.CloudinaryAdapter) cloudinary: CloudinaryPort,
  ) {
    this.userRepository = userRepository;
    this.cloudinary = cloudinary;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userRepository.createUser(userRequestDto);
  }

  async uploadAvatar({ base64Str }: UserUploadRequestDto): Promise<UserUploadResponseDto> {
    return UploadApiResponseDto(await this.cloudinary.upload({ base64Str, type: CloudinaryPresetType.AVATAR }));
  }
}
