import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { SubscribeButton } from 'components/common/subscribe-button/subscribe-button';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { channelActions } from 'store/actions';
import { channelSubscribe } from 'store/subscriptions/actions';

type Props = {
  className?: string;
  signinModalClassname?: string;
};

const Subscribe: FC<Props> = ({ className, signinModalClassname }) => {
  const dispatch = useAppDispatch();
  const isCurrentUserSubscribed =
    useAppSelector((state) => state.channel.currentChannel.data?.isCurrentUserSubscriber) ?? false;
  const channelId = useAppSelector((state) => state.channel.currentChannel.data?.id);
  const channelSubscribersCount = useAppSelector((state) => state.channel.currentChannel.data?.subscribersCount);
  const user = useAppSelector((state) => state.auth.user);
  const [showSigninModal, setShowSigninModal] = useState(false);
  return (
    <>
      <SubscribeButton
        hasUser={Boolean(user)}
        isCurrentUserSubscribed={isCurrentUserSubscribed}
        isDisabled={channelId === undefined}
        onSubscribeClick={(): void => {
          if (channelId !== undefined) {
            dispatch(channelSubscribe(channelId))
              .unwrap()
              .then(() => {
                if (channelSubscribersCount !== undefined) {
                  dispatch(
                    channelActions.updateChannelSubscriptionCount(
                      channelSubscribersCount + (isCurrentUserSubscribed ? -1 : 1),
                    ),
                  );
                }
              });
          }
        }}
        onUserUnauthenticated={(): void => setShowSigninModal(true)}
        className={className}
      />
      {showSigninModal && (
        <NeedSignInModal
          headerText={'Want to subscribe?'}
          mainText={'Sign in first'}
          onClose={(): void => {
            setShowSigninModal(false);
          }}
          className={signinModalClassname}
        />
      )}
    </>
  );
};

export { Subscribe };
