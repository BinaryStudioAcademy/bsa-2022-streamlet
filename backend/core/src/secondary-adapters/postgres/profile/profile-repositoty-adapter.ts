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
    await this.prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
      select: {
        profile: true,
        id: true,
        username: true,
      },
    });
    const isUpdatedProfileExist = await this.prismaClient.userProfile.findUnique({
      where: {
        userId,
      },
    });
    if (!isUpdatedProfileExist) {
      const updatedProfile = await this.prismaClient.userProfile.create({
        data: {
          firstName,
          lastName,
          userId,
          avatar: '',
        },
      });
      return createUpdateProfileResponse(username, updatedProfile);
    }

    const updatedProfile = await this.prismaClient.userProfile.update({
      where: {
        userId,
      },
      data: {
        firstName,
        lastName,
      },
    });
    return createUpdateProfileResponse(username, updatedProfile);
  }
}
