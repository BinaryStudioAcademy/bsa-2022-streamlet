import clsx from 'clsx';
import { generateAbbreviatureNameUser, getUserDisplayName } from 'helpers/user';
import defaultUser from 'assets/img/default-user-avatar.jpg';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  avatar?: string;
  userNamingInfo?: {
    firstName?: string;
    lastName?: string;
    userName: string;
  };
  className?: string;
};

const UserAvatarOrInitials: FC<Props> = ({ avatar, userNamingInfo, className }) => {
  let pictureComponent: ReactNode;
  if (avatar) {
    pictureComponent = <img className={styles['avatar']} src={avatar} alt={userNamingInfo?.userName || 'channel'} />;
  } else if (userNamingInfo) {
    pictureComponent = (
      <div className={styles['default-avatar']}>{generateAbbreviatureNameUser(getUserDisplayName(userNamingInfo))}</div>
    );
  } else {
    pictureComponent = <img className={styles['avatar']} src={defaultUser} alt="channel" />;
  }
  return <div className={clsx(styles['avatar-container'], className)}>{pictureComponent}</div>;
};

export { UserAvatarOrInitials };
