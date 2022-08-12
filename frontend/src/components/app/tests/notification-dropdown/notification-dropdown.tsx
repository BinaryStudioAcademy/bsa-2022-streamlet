import { FC } from 'common/types/types';
import { NotificationDropdown } from 'components/notification-dropdown/notification-dropdown';
import React from 'react';
import styles from './styles.module.scss';

const NotificationDropdownTest: FC = () => {
  return (
    <div className={styles.header}>
      <NotificationDropdown />
    </div>
  );
};

export { NotificationDropdownTest };
