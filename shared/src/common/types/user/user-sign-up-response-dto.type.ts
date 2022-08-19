import { TokenPair } from '../types';
import { UserBaseResponseDto } from './user';

type UserSignUpResponseDto = { user: UserBaseResponseDto; tokens: TokenPair; message: string };

export { type UserSignUpResponseDto };
