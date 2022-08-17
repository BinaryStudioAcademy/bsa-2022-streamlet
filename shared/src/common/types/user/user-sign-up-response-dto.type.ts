import { TokenPair } from '../types';
import { UserBaseResponseDto } from './user';

type UserSignUpResponseDto = { user: UserBaseResponseDto; tokens: TokenPair };

export { type UserSignUpResponseDto };
