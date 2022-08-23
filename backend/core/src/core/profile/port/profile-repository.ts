import { type ProfileUpdateRequestDto, type ProfileUpdateResponseDto } from '~/shared/types/types';
import { UserProfile } from '@prisma/client';

export interface ProfileRepository {
  update(updateData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto>;
  getByUserId(userId: string, username: string, userProfile: UserProfile): Promise<ProfileUpdateResponseDto>;
  updateAvatar(url: string, userId: string): Promise<ProfileUpdateResponseDto>;
  checkProfileExist(userId: string): Promise<UserProfile | null>;
  createDefaultProfile(userId: string): Promise<UserProfile>;
}
