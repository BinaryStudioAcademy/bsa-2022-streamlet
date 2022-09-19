import React from 'react';
import clsx from 'clsx';
import { AppRoutes } from 'common/enums/enums';
import { FC, StatsData } from 'common/types/types';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';
import { Link } from 'react-router-dom';
import { Subscribe } from '../common/subscribe/subscribe';
import styles from './styles.module.scss';

type Props = {
  wrapperClassName?: string;
  channelInfo: {
    id: string;
    name: string;
    avatar: string;
    subscriberCount: number;
  };
  statsData?: StatsData;
};

const ChannelInfoRow: FC<Props> = ({ wrapperClassName, channelInfo, statsData }) => {
  return (
    <div className={clsx(styles['wrapper'], wrapperClassName)}>
      <div className={styles['channel-info-container']}>
        <Link
          to={`${AppRoutes.CHANNEL}/${channelInfo.id}`}
          style={{ textDecoration: 'none' }}
          className={styles['channel-avatar']}
        >
          <UserAvatarOrInitials avatar={channelInfo.avatar} sizing={{ initialsSize: '24px', size: '50px' }} />
        </Link>
        <Link
          to={`${AppRoutes.CHANNEL}/${channelInfo.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          className={styles['channel-name']}
        >
          {channelInfo.name}
        </Link>
        <div className={styles['sub-count']}>
          {channelInfo.subscriberCount} subscriber{channelInfo.subscriberCount === 1 ? '' : 's'}
        </div>
      </div>
      <div className={styles['sub-btn-container']}>
        <Subscribe
          signinModalClassname={styles['subscribe-signin-modal']}
          className={styles['subscribe-btn']}
          statsData={statsData}
        />
      </div>
    </div>
  );
};

export { ChannelInfoRow };
