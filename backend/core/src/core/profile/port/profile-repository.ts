import { type ProfileUpdateRequestDto, type ProfileUpdateResponseDto } from '~/shared/types/types';

export interface ProfileRepository {
  update(updateData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto>;
  getByUserId(userId: string, username: string): Promise<ProfileUpdateResponseDto>;
  updateAvatar(url: string, userId: string): Promise<ProfileUpdateResponseDto>;
}
