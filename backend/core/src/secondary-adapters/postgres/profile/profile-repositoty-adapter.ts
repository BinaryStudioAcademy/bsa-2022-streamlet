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

  async getByUserId(userId: string, username: string): Promise<ProfileUpdateResponseDto> {
    const isProfileExist = await this.checkProfileExist(userId);
    if (!isProfileExist) {
      const defaultProfile = await this.createDefaultProfile(userId);
      return createUpdateProfileResponse(userId, defaultProfile);
    }
    return createUpdateProfileResponse(username, isProfileExist);
  }

  async updateAvatar(url: string, userId: string): Promise<ProfileUpdateResponseDto> {
    const isProfileExist = await this.checkProfileExist(userId);
    if (!isProfileExist) {
      await this.createDefaultProfile(userId);
    }
    const updatedProfile = await this.prismaClient.userProfile.update({
      where: {
        userId,
      },
      data: {
        avatar: url,
      },
    });
    return createUpdateProfileResponse(userId, updatedProfile);
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
    const isProfileExist = await this.checkProfileExist(userId);
    if (!isProfileExist) {
      await this.createDefaultProfile(userId);
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
    return this.prismaClient.userProfile.findUnique({
      where: {
        userId,
      },
    });
  }
}
