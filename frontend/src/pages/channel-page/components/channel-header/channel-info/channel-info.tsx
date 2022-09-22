import clsx from 'clsx';
import { UserAvatarOrInitials } from 'components/common/user-avatar-or-initials/user-avatar-or-initials';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  avatarLink: string;
  channelName: string;
  subscribersCount: number;
  className?: string;
};

const ChannelInfo: FC<Props> = ({ avatarLink, channelName, subscribersCount, className }) => {
  return (
    <section className={clsx(styles['channel-info'], className)}>
      <h3 className={styles['channel-name']}>{channelName}</h3>
      <UserAvatarOrInitials
        className={styles['channel-avatar-wrapper']}
        avatar={avatarLink}
        userNamingInfo={{ userName: channelName ?? '' }}
      />
      <p className={styles['subscribers-count']}>{subscribersCount} subscribers</p>
    </section>
  );
};

export { ChannelInfo };
