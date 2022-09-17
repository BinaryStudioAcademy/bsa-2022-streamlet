import { Category, StreamPermission, User } from '@prisma/client';
import { UserGetPreferencesDto, UserSignUpRequestDto } from '~/shared/types/types';
import { DefaultRequestParam, UserBindCategoriesDto } from 'shared/build';
import { BadRequest } from '~/shared/exceptions/bad-request';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null>;
  createUser(userRequestDto: UserSignUpRequestDto): Promise<User>;
  changePassword(userId: string, newPassword: string): Promise<void>;
  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void>;
  updateUserName(userId: string, username: string): Promise<User | BadRequest>;
  bindCategories(bindCategoriesDto: UserBindCategoriesDto): Promise<Category[]>;
  getPreferedCategories(getPreferencesDto: DefaultRequestParam): Promise<UserGetPreferencesDto | null>;
  updateStreamPermission(userId: string, streamPermission: StreamPermission): Promise<User>;
}
