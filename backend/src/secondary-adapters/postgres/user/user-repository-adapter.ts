import { inject, injectable } from 'inversify';
import { UserRepository } from '~/core/user/port/user-repository';
import { PrismaClient, User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserSignUpRequestDto, UserSignUpResponseDto } from 'shared/build';

@injectable()
export class UserRepositoryAdapter implements UserRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  /**
   * @swagger
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       email:
   *         type: string
   *         format: email
   *       password:
   *         type: string
   *       isActivated:
   *         type: boolean
   *       createdAt:
   *         type: string
   *         format: date-time
   */
  async getAll(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  /**
   * @swagger
   * definitions:
   *    UserSignUpRequest:
   *      type: object
   *      properties:
   *        email:
   *          type: string
   *          format: email
   *        password:
   *          type: string
   *    UserSignUpResponse:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          format: uuid
   *        email:
   *          type: string
   *          format: email
   */
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
