import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserSignUpRequestDto, UserSignUpResponseDto } from 'shared/build';
import { trimUser } from '~/shared/helpers';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
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

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    // TODO: handle duplication
    const user = await this.prismaClient.user.create({
      data: userRequestDto,
    });

    return trimUser(user);
  }
}
