import { NOTIFICATION_TYPE } from 'react-notifications-component';
import { FC } from 'common/types/types';
import 'react-notifications-component/dist/scss/notification.scss';
import { IconColor } from 'common/enums/enums';
import { Icon } from 'components/common/icon';
import cn from 'clsx';

import styles from './styles.module.scss';

interface INotificationParams {
  type: NOTIFICATION_TYPE;
  iconName: string;
  title: string;
  message: string;
}

const Notification = ({ type, iconName, title, message }: INotificationParams): FC => {
  return (
    <div className={cn(styles.item, `rnc__notification-item--${type}`)}>
      <div className={cn(styles.icon)}>
        <Icon name={iconName} color={IconColor.WHITE} />
      </div>
      <div className={cn(styles.content)}>
        <div className={cn(styles.title)}>{title}</div>
        <div className={cn(styles.message)}>{message}</div>
      </div>
    </div>
  );
};

export { Notification };
