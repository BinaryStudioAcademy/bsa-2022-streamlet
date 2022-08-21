import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES, UserBaseResponseDto, UserSignUpRequestDto } from '~/shared/types/types';
import { trimUser, hashValue } from '~/shared/helpers';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  }

  getById(id: string): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        email: true,
        isActivated: true,
      },
    });
  }
  updateUserName(userId: string, username: string): Promise<User | null> {
    return this.prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
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

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<UserBaseResponseDto> {
    const user = await this.prismaClient.user.create({
      data: { ...userRequestDto, password: await hashValue(userRequestDto.password) },
    });

    return trimUser(user);
  }
}
