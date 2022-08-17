import { TokenPair } from '../types';
import { UserBaseResponseDto } from './user';

type UserSignInResponseDto = { user: UserBaseResponseDto; tokens: TokenPair };

export { type UserSignInResponseDto };
