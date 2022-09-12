import { inject, injectable } from 'inversify';
import { ProfileRepository } from '../port/profile-repository';
import { CONTAINER_TYPES, ProfileUpdateResponseDto, ProfileUpdateRequestDto } from '~/shared/types/types';
import { ImageStorePresetType, UserUploadRequestDto } from 'shared/build';
import { ImageStorePort } from '~/core/common/port/image-store';
import { UserRepository } from '~/core/user/port/user-repository';
import { BadRequest } from '~/shared/exceptions/exceptions';

@injectable()
export class ProfileService {
  private profileRepository: ProfileRepository;
  private imageStore: ImageStorePort;
  private userRepository: UserRepository;

  constructor(
    @inject(CONTAINER_TYPES.ProfileRepository) ProfileRepository: ProfileRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
  ) {
    this.profileRepository = ProfileRepository;
    this.imageStore = imageStore;
    this.userRepository = userRepository;
  }

  async update(
    updateCredentialRequestDto: ProfileUpdateRequestDto,
  ): Promise<ProfileUpdateResponseDto | BadRequest | null> {
    const { userId, username } = updateCredentialRequestDto;
    const isUserExist = await this.userRepository.getById(userId);

    if (!isUserExist) {
      return null;
    }

    const isProfileExist = await this.profileRepository.checkProfileExist(userId);

    if (!isProfileExist) {
      await this.profileRepository.createDefaultProfile(userId);
    }

    const updateUserNameResult = await this.userRepository.updateUserName(userId, username);

    if (updateUserNameResult instanceof BadRequest) {
      return updateUserNameResult;
    }
    return this.profileRepository.update(updateCredentialRequestDto);
  }

  async uploadAvatar({ base64Str, userId }: UserUploadRequestDto): Promise<ProfileUpdateResponseDto | null> {
    const isUserExist = await this.userRepository.getById(userId);

    if (!isUserExist) {
      return null;
    }

    const { url } = await this.imageStore.upload({ base64Str, type: ImageStorePresetType.AVATAR, userId });
    const isProfileExist = await this.profileRepository.checkProfileExist(userId);

    if (!isProfileExist) {
      await this.profileRepository.createDefaultProfile(userId);
    }

    return this.profileRepository.updateAvatar(url, userId);
  }

  async getByUserId(userId: string): Promise<ProfileUpdateResponseDto | null> {
    const isUserExist = await this.userRepository.getById(userId);

    if (!isUserExist) {
      return null;
    }

    const { username } = isUserExist;

    const isProfileExist = await this.profileRepository.checkProfileExist(userId);

    if (!isProfileExist) {
      const defaultProfile = await this.profileRepository.createDefaultProfile(userId);
      return this.profileRepository.getByUserId(userId, username, defaultProfile);
    }

    return this.profileRepository.getByUserId(userId, username, isProfileExist);
  }
}
