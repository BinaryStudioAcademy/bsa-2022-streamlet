type BaseSubscriptionResponseDto = {
  id: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
  };
};

type DataSubscription = {
  list: BaseSubscriptionResponseDto[];
  total: number;
};

export { BaseSubscriptionResponseDto, DataSubscription };
