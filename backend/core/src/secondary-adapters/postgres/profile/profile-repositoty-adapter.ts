import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { CONTAINER_TYPES, ProfileUpdateRequestDto, ProfileUpdateResponseDto } from '~/shared/types/types';
import { createUpdateProfileResponse } from '~/shared/helpers';
import { ProfileRepository } from '~/core/profile/port/profile-repository';

@injectable()
export class ProfileRepositoryAdapter implements ProfileRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async update(updateData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    const { firstName, lastName, userId, username } = updateData;
    const { username: newUserName } = await this.prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });
    const updatedProfile = await this.prismaClient.userProfile.update({
      where: {
        userId,
      },
      data: {
        firstName,
        lastName,
      },
    });
    return createUpdateProfileResponse(newUserName, updatedProfile);
  }
}
