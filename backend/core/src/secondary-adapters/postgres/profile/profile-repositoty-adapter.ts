import { inject, injectable } from 'inversify';
import { PrismaClient, UserProfile } from '@prisma/client';
import { CONTAINER_TYPES, ProfileUpdateRequestDto, ProfileUpdateResponseDto } from '~/shared/types/types';
import { createUpdateProfileResponse } from '~/shared/helpers';
import { ProfileRepository } from '~/core/profile/port/profile-repository';

@injectable()
export class ProfileRepositoryAdapter implements ProfileRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getByUserId(userId: string, username: string, userProfile: UserProfile): Promise<ProfileUpdateResponseDto> {
    return createUpdateProfileResponse(username, userProfile);
  }

  async updateAvatar(url: string, userId: string): Promise<ProfileUpdateResponseDto> {
    const updatedProfile = await this.prismaClient.userProfile.update({
      where: {
        userId,
      },
      data: {
        avatar: url,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    const { username } = updatedProfile.user;
    return createUpdateProfileResponse(username, updatedProfile);
  }

  async update(updateData: ProfileUpdateRequestDto): Promise<ProfileUpdateResponseDto> {
    const { firstName, lastName, userId, username } = updateData;

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

  async createDefaultProfile(userId: string): Promise<UserProfile> {
    return this.prismaClient.userProfile.create({
      data: {
        firstName: '',
        lastName: '',
        userId,
        avatar: '',
      },
    });
  }

  async checkProfileExist(userId: string): Promise<UserProfile | null> {
    return this.prismaClient.userProfile.findFirst({
      where: {
        userId,
      },
    });
  }
}
