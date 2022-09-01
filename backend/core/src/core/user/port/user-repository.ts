import { Category, User } from '@prisma/client';
import { UserSignUpRequestDto } from '~/shared/types/types';
import { UserBindCategoriesDto } from 'shared/build';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null>;
  createUser(userRequestDto: UserSignUpRequestDto): Promise<User>;
  changePassword(userId: string, newPassword: string): Promise<void>;
  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void>;
  updateUserName(userId: string, username: string): Promise<User | null>;
  bindCategories(bindCategoriesDto: UserBindCategoriesDto): Promise<Category[]>;
}
