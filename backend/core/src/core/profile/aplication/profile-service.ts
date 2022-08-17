import { inject, injectable } from 'inversify';
import { ProfileRepository } from '../port/profile-repository';
import { CONTAINER_TYPES, ProfileUpdateResponseDto, ProfileUpdateRequestDto } from '~/shared/types/types';
import { ImageStorePresetType, UserUploadRequestDto } from 'shared/build';
import { ImageStorePort } from '~/core/common/port/image-store';

@injectable()
export class ProfileService {
  private profileRepository: ProfileRepository;
  private imageStore: ImageStorePort;

  constructor(
    @inject(CONTAINER_TYPES.ProfileRepository) ProfileRepository: ProfileRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
  ) {
    this.profileRepository = ProfileRepository;
    this.imageStore = imageStore;
  }

  update(updateCredentialRequestDto: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    return this.profileRepository.update(updateCredentialRequestDto);
  }

  async uploadAvatar({ base64Str, userId }: UserUploadRequestDto): Promise<ProfileUpdateResponseDto> {
    const { url } = await this.imageStore.upload({ base64Str, type: ImageStorePresetType.AVATAR });
    return this.profileRepository.updateAvatar(url, userId);
  }
  getByUserId(userId: string, username: string): Promise<ProfileUpdateResponseDto> {
    return this.profileRepository.getByUserId(userId, username);
  }
}
