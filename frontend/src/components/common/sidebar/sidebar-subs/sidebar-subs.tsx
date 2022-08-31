import clsx from 'clsx';
import { AppRoutes, IconName } from 'common/enums/enums';
import { Icon } from 'components/common/icon';
import { Channel } from 'components/sidebar/channel';
import { Promo } from 'components/sidebar/promo';
import { useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { store } from 'store/store';
import { selectAllSidebarSubscriptions } from 'store/subscriptions/reducer';
import { MIN_CHANNEL_ADD_NUMBER, MIN_CHANNEL_SHOW_NUMBER } from '../config';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  promoWrpClassName?: string;
  keepVisisble?: boolean;
};

const SidebarSubs: FC<Props> = ({ className, promoWrpClassName, keepVisisble = false }) => {
  const navigate = useNavigate();

  const promoProps = {
    text: 'Sign in to like videos, comment and subscribe.',
    promoWrpClassName: clsx(styles['sign-in-promo-wrp'], promoWrpClassName),
    textSpanClassName: styles['sign-in-promo-text'],
    btnTitle: 'Sign in',
    btnClassName: styles['sign-in-promo-btn'],
    btnOnClick: () => navigate(AppRoutes.SIGN_IN),
  };

  const user = useAppSelector((state) => state.auth.user);
  const isLogged = Boolean(user);

  const subscriptionList = selectAllSidebarSubscriptions(store.getState());
  const totalSubs = useAppSelector((state) => state.subscriptions.subscriptionsData.total);

  const [subscriptionDropdownShow, setSubscriptionDropdownShow] = useState(false);

  const handleSetSubscriptionDropdownShow = (): void => setSubscriptionDropdownShow(!subscriptionDropdownShow);

  const minCount = totalSubs < MIN_CHANNEL_SHOW_NUMBER ? totalSubs : MIN_CHANNEL_SHOW_NUMBER;
  const hideCount = totalSubs - minCount;
  const showCount = subscriptionDropdownShow || hideCount < MIN_CHANNEL_ADD_NUMBER ? totalSubs : minCount;

  return (
    <div className={clsx({ [styles['keep-visible']]: keepVisisble })}>
      {isLogged ? (
        <div className={className}>
          <p className={styles['subscription-title']}>Subscriptions</p>
          <div className={styles['subscription-list']}>
            {totalSubs === 0 && 'No subscriptions yet'}
            {subscriptionList.slice(0, showCount).map((sub) => (
              <Channel key={sub.id} channelInfo={{ avatar: sub.channelAvatar, id: sub.id, name: sub.title }} />
            ))}
            {totalSubs > showCount && (
              <div className={styles['subscription-more']} onClick={handleSetSubscriptionDropdownShow}>
                <Icon name={subscriptionDropdownShow ? IconName.CHEVRON_UP : IconName.CHEVRON_DOWN} width="24" />
                <span>{subscriptionDropdownShow ? 'Show fewer' : `Show ${hideCount} more`}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Promo {...promoProps} />
      )}
    </div>
  );
};

export { SidebarSubs };
