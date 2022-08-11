import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, MailTestRequestDto, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';

import {
  MailResponseDto,
  MailType,
  ImageStorePresetType,
  ImageUploadResponseDto,
  UserSignUpResponseDto,
  UserUploadRequestDto,
} from 'shared/build';
import { ImageStorePort } from '~/core/common/port/image-store';

import { MailRepository } from '~/core/mail/port/mail-repository';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private mailRepository: MailRepository;
  private imageStore: ImageStorePort;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
    @inject(CONTAINER_TYPES.MailRepository) mailRepository: MailRepository,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.imageStore = imageStore;
    this.mailRepository = mailRepository;
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

  uploadAvatar({ base64Str }: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.imageStore.upload({ base64Str, type: ImageStorePresetType.AVATAR });
  }
  // This method is created only for testing purposes. When proper registration method will be implemented,
  // this.mailRepository.sendEmail() will be called  from there.
  testSendingEmail(mailTestRequestDto: MailTestRequestDto): Promise<MailResponseDto> {
    return this.mailRepository.sendMail({
      receiver: mailTestRequestDto.email,
      type: MailType.WELCOME,
      props: {
        name: mailTestRequestDto.name,
      },
    });
  }
}
