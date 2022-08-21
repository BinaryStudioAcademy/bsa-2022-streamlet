import 'react-notifications-component/dist/scss/notification.scss';
import { FC, NotificationParams } from 'common/types/types';
import { IconColor } from 'common/enums/enums';
import { Icon } from 'components/common/icon';
import cn from 'clsx';

import styles from './styles.module.scss';

const Notification: FC<NotificationParams> = ({ type, iconName, title, message }) => {
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
