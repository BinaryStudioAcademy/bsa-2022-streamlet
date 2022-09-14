import { Link } from 'react-router-dom';
import { FC, ChannelCard as ChannelCardType } from 'common/types/types';
import { AppRoutes } from 'common/enums/enums';
import { useAppDispatch, useState } from 'hooks/hooks';
import { getTextFormatedViewsString } from 'helpers/helpers';
import { generateAbbreviatureNameUser } from 'helpers/user';
import { SubscribeButton } from 'components/common/common';
import { NeedSignInModal } from 'components/common/sign-in-modal/sign-in-modal';
import { channelSubscribe } from 'store/subscriptions/actions';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  channel: ChannelCardType;
  className?: string;
  hideFromDisplay?: Record<string, unknown>;
  hasUser: boolean;
  isCurrentUserSubscribed: boolean;
};

const ChannelCard: FC<Props> = ({
  channel: { id, name, description, avatar, subscribersCount, videosCount },
  isCurrentUserSubscribed,
  hasUser,
}) => {
  const dispatch = useAppDispatch();

  const [showSigninModal, setShowSigninModal] = useState(false);

  const linkToChannelPage = `${AppRoutes.CHANNEL}/${id}`;

  return (
    <div className={styles['channel-card']}>
      <Link to={linkToChannelPage} className={styles['channel-card-logo']}>
        {avatar ? (
          <div className={styles['channel-card-avatar']} style={{ backgroundImage: `url(${avatar})` }} title={name} />
        ) : (
          <div className={styles['channel-card-avatar-default']}>
            <span>{generateAbbreviatureNameUser(name)}</span>
          </div>
        )}
      </Link>
      <div className={styles['channel-card-info']}>
        <Link to={linkToChannelPage} className={styles['channel-card-title']} title={name}>
          {name}
        </Link>
        <div className={styles['channel-card-meta']}>
          <span className={styles['channel-card-meta-data']}>{`${videosCount} videos`}</span>
          <span className={styles['channel-card-meta-data']}>
            {`${getTextFormatedViewsString(subscribersCount)} subscribers`}
          </span>
        </div>
        <div className={styles['channel-card-desc']}>{description}</div>
      </div>
      <div className={styles['channel-card-subscribe']}>
        <SubscribeButton
          hasUser={hasUser}
          isCurrentUserSubscribed={isCurrentUserSubscribed}
          isDisabled={id === undefined}
          onSubscribeClick={(): void => {
            if (id !== undefined) {
              dispatch(channelSubscribe(id))
                .unwrap()
                .then(() => {
                  dispatch(
                    searchActions.updateChannelCardSubscriptionCount({
                      id,
                      count: subscribersCount + (isCurrentUserSubscribed ? -1 : 1),
                    }),
                  );
                });
            }
          }}
          onUserUnauthenticated={(): void => setShowSigninModal(true)}
          className={styles['channel-card-subscribe-btn']}
        />
        {showSigninModal && (
          <NeedSignInModal
            headerText={'Want to subscribe?'}
            mainText={'Sign in first'}
            onClose={(): void => {
              setTimeout(setShowSigninModal, 30, false);
            }}
            className={styles['channel-card-subscribe-modal']}
          />
        )}
      </div>
    </div>
  );
};

export { ChannelCard };
