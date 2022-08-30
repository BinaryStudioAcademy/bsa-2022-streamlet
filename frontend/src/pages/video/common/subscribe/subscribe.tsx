import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { SubscribeButton } from 'components/common/subscribe-button/subscribe-button';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { channelSubscribe } from 'store/subscriptions/actions';

type Props = {
  className?: string;
  signinModalClassname?: string;
};

const Subscribe: FC<Props> = ({ className, signinModalClassname }) => {
  const dispatch = useAppDispatch();
  const isCurrentUserSubscribed = useAppSelector((state) => state.videoPage.video?.isUserSubscribedOnChannel) ?? false;
  const channelId = useAppSelector((state) => state.videoPage.video?.channel.id);
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
            dispatch(channelSubscribe(channelId));
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
