import React from 'react';
import { FC, StatsData } from 'common/types/types';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { SubscribeButton } from 'components/common/subscribe-button/subscribe-button';
import { useAppDispatch, useAppSelector, useState } from 'hooks/hooks';
import { ChannelSubscriptionStatus } from 'shared/build';
import { statsActions } from 'store/actions';
import { channelSubscribe } from 'store/subscriptions/actions';

type Props = {
  className?: string;
  signinModalClassname?: string;
  statsData?: StatsData;
};

const Subscribe: FC<Props> = ({ className, signinModalClassname, statsData }) => {
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
            dispatch(channelSubscribe(channelId))
              .unwrap()
              .then(({ isSubscribed }) => {
                if (statsData) {
                  dispatch(
                    statsActions.updateVideoStat({
                      statId: statsData.statId,
                      data: {
                        videoId: statsData.videoId,
                        subscription: isSubscribed
                          ? ChannelSubscriptionStatus.SUBSCRIBED
                          : ChannelSubscriptionStatus.UNSUBSCRIBED,
                      },
                    }),
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
