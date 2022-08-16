import { UserProfile } from '@prisma/client';
import { ProfileUpdateResponseDto } from '../../shared/types/types';

export const createUpdateProfileResponse = (username: string, updateProfile: UserProfile): ProfileUpdateResponseDto => {
  const { firstName, lastName, userId, id: profileId, avatar } = updateProfile;
  return {
    profileId,
    avatar,
    firstName,
    lastName,
    userId,
    username,
  };
};
