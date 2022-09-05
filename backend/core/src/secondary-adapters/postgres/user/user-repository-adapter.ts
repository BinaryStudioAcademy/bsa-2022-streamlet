import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { Category, Prisma, PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES, UserGetPreferencesDto, UserSignUpRequestDto } from '~/shared/types/types';
import { hashValue } from '~/shared/helpers';
import { DefaultRequestParam, ImageUploadErrorMessage, UserBindCategoriesDto } from 'shared/build';
import { DuplicationError } from '~/shared/exceptions/duplication-error';
import { BadRequest } from '~/shared/exceptions/bad-request';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  async getPreferedCategories({ id }: DefaultRequestParam): Promise<UserGetPreferencesDto | null> {
    return this.prismaClient.user.findFirst({
      where: {
        id,
      },
      include: {
        videoPreferences: {
          include: {
            category: true,
          },
        },
      },
    });
  }
  async bindCategories({ id: userId, categories }: UserBindCategoriesDto): Promise<Category[]> {
    await this.prismaClient.$transaction(
      categories.map((categoryId) => {
        return this.prismaClient.categoryToUser.upsert({
          where: {
            categoryId_userId: {
              userId,
              categoryId,
            },
          },
          update: {},
          create: {
            userId,
            categoryId,
          },
        });
      }),
    );

    return this.prismaClient.category.findMany({
      where: {
        id: {
          in: categories,
        },
      },
    });
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

  async updateUserName(userId: string, username: string): Promise<User | BadRequest> {
    try {
      return await this.prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          username,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const { code: errorCode } = e;
        if (errorCode === 'P2002') {
          return new DuplicationError('This username already taken try another one', errorCode);
        }
      }
    }
    return new BadRequest(ImageUploadErrorMessage.UNKNOWN_ERROR);
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
