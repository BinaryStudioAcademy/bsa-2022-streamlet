import { Category, User } from '@prisma/client';
import { UserGetPreferencesDto, UserSignUpRequestDto } from '~/shared/types/types';
import { DefaultRequestParam, UserBindCategoriesDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null>;
  createUser(userRequestDto: UserSignUpRequestDto): Promise<User>;
  changePassword(userId: string, newPassword: string): Promise<void>;
  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void>;
  updateUserName(userId: string, username: string): Promise<User | PrismaError>;
  bindCategories(bindCategoriesDto: UserBindCategoriesDto): Promise<Category[]>;
  getPreferedCategories(getPreferencesDto: DefaultRequestParam): Promise<UserGetPreferencesDto | null>;
}
