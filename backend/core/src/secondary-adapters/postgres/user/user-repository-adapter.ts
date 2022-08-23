import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { hashValue } from '~/shared/helpers';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        password: await hashValue(newPassword),
      },
    });
  }

  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
              mode: 'insensitive',
            },
          },
          {
            username: {
              equals: username,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  getById(id: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        id,
      },
    });
  }

  getByEmail(email: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  getAll(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: { ...userRequestDto, password: await hashValue(userRequestDto.password) },
    });

    return user;
  }

  async setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        isActivated: shouldBeActivated,
      },
    });
  }
}
