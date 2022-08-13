import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES, UserBaseResponseDto, UserSignUpRequestDto } from '~/shared/types/types';
import { trimUser, hashValue } from '~/shared/helpers';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getUserByQuery(query: Prisma.UserWhereInput): Promise<User | null> {
    return this.prismaClient.user.findFirst({
      where: query,
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

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<UserBaseResponseDto> {
    const user = await this.prismaClient.user.create({
      data: { ...userRequestDto, password: await hashValue(userRequestDto.password) },
    });

    return trimUser(user);
  }
}
