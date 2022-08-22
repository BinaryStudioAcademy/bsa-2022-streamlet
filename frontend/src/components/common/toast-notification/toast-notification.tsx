import 'react-notifications-component/dist/scss/notification.scss';
import { FC, ToastNotificationParams } from 'common/types/types';
import { IconColor } from 'common/enums/enums';
import { Icon } from 'components/common/common';
import clsx from 'clsx';

import styles from './styles.module.scss';

const ToastNotification: FC<ToastNotificationParams> = ({ type, iconName, title, message }) => {
  return (
    <div className={clsx(styles.item, `rnc__notification-item--${type}`)}>
      <div className={clsx(styles.icon)}>
        <Icon name={iconName} color={IconColor.WHITE} />
      </div>
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.title)}>{title}</div>
        <div className={clsx(styles.message)}>{message}</div>
      </div>
    </div>
  );
};

export { ToastNotification };
