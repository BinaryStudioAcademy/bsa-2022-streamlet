import { type ProfileUpdateRequestDto, type ProfileUpdateResponseDto } from '~/shared/types/types';

export interface ProfileRepository {
  update(updateData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto>;
}
