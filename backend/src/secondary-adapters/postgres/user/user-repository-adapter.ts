import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserSignUpRequestDto, UserSignUpResponseDto } from 'shared/build';
import { CloudinaryPort } from '~/core/common/port/cloudinary';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;
  private cloudinary: CloudinaryPort;

  constructor(
    @inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient,
    @inject(CONTAINER_TYPES.CloudinaryAdapter) cloudinary: CloudinaryPort,
  ) {
    this.prismaClient = prismaClient;
    this.cloudinary = cloudinary;
  }

  async getAll(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    const user = await this.prismaClient.user.create({
      data: userRequestDto,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}
