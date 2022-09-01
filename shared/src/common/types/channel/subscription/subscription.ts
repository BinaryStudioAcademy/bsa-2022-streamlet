import { ChannelSubscriptionResponseDto } from '../channel-subscription-response-dto.type';

type CreateSubscriptionResponseDto = {
  isSubscribed: boolean;
  channel: ChannelSubscriptionResponseDto;
};

export { type CreateSubscriptionResponseDto };
