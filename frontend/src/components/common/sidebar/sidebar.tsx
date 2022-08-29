import clsx from 'clsx';
import { FC, BaseSubscriptionResponseDto } from 'common/types/types';
import { AppRoutes, IconName } from 'common/enums/enums';
import { useAppSelector, useNavigate, useState } from 'hooks/hooks';
import { Icon } from '../icon';
import { Channel } from 'components/sidebar/channel';
import { Promo } from 'components/sidebar/promo';
import { Link } from '../common';
import { RoutePage } from './route-pages.config';
import { MobileSidebar, MobileSidebarProps } from '../mobile-sidebar/mobile-sidebar';

import styles from './sidebar.module.scss';
import { MIN_CHANNEL_ADD_NUMBER, MIN_CHANNEL_SHOW_NUMBER } from './config';

interface SidebarProps {
  isSidebarOpen: boolean;
  isLogged: boolean;
  configRoutePages: RoutePage[];
  activeRouteId: number;
  mobileSidebarProps: MobileSidebarProps;
}

const Sidebar: FC<SidebarProps> = ({
  configRoutePages,
  activeRouteId,
  isSidebarOpen,
  isLogged,
  mobileSidebarProps,
}) => {
  const navigate = useNavigate();

  const promoProps = {
    text: 'Sign in to like videos, comment and subscribe.',
    promoWrpClassName: styles['sign-in-promo-wrp'],
    textSpanClassName: styles['sign-in-promo-text'],
    btnTitle: 'Sign in',
    btnClassName: styles['sign-in-promo-btn'],
    btnOnClick: () => navigate(AppRoutes.SIGN_IN),
  };

  const [subscriptionDropdownShow, setSubscriptionDropdownShow] = useState(false);

  const handleSetSubscriptionDropdownShow = (): void => setSubscriptionDropdownShow(!subscriptionDropdownShow);
  const subscriptionList = useAppSelector((state) => state.sidebar.subscriptions) ?? { list: [], total: 0 };

  const minCount = subscriptionList.total < MIN_CHANNEL_SHOW_NUMBER ? subscriptionList.total : MIN_CHANNEL_SHOW_NUMBER;
  const hideCount = subscriptionList.total - minCount;
  const showCount = subscriptionDropdownShow || hideCount < MIN_CHANNEL_ADD_NUMBER ? subscriptionList.total : minCount;

  return (
    <>
      <MobileSidebar {...mobileSidebarProps} />
      <div className={clsx({ [styles.close]: !isSidebarOpen }, styles.sidebar)}>
        <nav className={styles['navigate-menu']}>
          <ul>
            {configRoutePages.map((page) => (
              <Link key={page.linkTo} to={page.linkTo} className={clsx({ [styles.active]: page.id === activeRouteId })}>
                <li>
                  <Icon name={page.iconName} width="24" height="24" />
                  <span className={styles['link-name']}>{page.textLink}</span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className={styles['divider']} />
        {isLogged ? (
          <div className={styles['block-subscription']}>
            <p className={styles['subscription-title']}>Subscriptions</p>
            <div className={styles['subscription-list']}>
              {subscriptionList.total === 0 && 'No subscriptions yet'}
              {subscriptionList.list.slice(0, showCount).map((sub: BaseSubscriptionResponseDto) => (
                <Channel key={sub.id} channelInfo={sub.channel} />
              ))}
              {subscriptionList.total > showCount && (
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
    </>
  );
};

export { Sidebar };
