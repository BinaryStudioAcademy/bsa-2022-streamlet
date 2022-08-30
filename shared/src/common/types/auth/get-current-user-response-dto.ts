import { DataSubscription, UserBaseResponseDto } from '../types';

type GetCurrentUserResponseDto = { user: UserBaseResponseDto; subscriptions: DataSubscription };

export { type GetCurrentUserResponseDto };
