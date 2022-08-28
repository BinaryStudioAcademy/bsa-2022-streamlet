import { SubscribeButton } from 'components/common/subscribe-button/subscribe-button';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { channelSubscribeToggle } from 'store/channel/actions';

type Props = {
  className?: string;
};

const Subscribe: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isCurrentUserSubscribed =
    useAppSelector((state) => state.channel.currentChannel.data?.isCurrentUserSubscriber) ?? false;
  const channelId = useAppSelector((state) => state.channel.currentChannel.data?.id);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <SubscribeButton
      hasUser={Boolean(user)}
      isCurrentUserSubscribed={isCurrentUserSubscribed}
      isDisabled={channelId === undefined}
      onSubscribeClick={(): void => {
        if (channelId !== undefined) {
          dispatch(channelSubscribeToggle(channelId));
        }
      }}
      className={className}
    />
  );
};

export { Subscribe };
