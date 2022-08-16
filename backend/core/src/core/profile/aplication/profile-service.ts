import { inject, injectable } from 'inversify';
import { ProfileRepository } from '../port/profile-repository';
import { CONTAINER_TYPES, ProfileUpdateResponseDto, ProfileUpdateRequestDto } from '~/shared/types/types';
import { ImageStorePresetType, ImageUploadResponseDto, UserUploadRequestDto } from 'shared/build';
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

  uploadAvatar({ base64Str }: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.imageStore.upload({ base64Str, type: ImageStorePresetType.AVATAR });
  }
}
