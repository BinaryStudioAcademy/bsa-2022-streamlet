import { FC, NotificationMessageResponseDto } from 'common/types/types';
import { getHowLongAgoString } from 'helpers/helpers';

import styles from './styles.module.scss';

type NotificationProps = {
  notification: NotificationMessageResponseDto;
  onRead(id: string): void;
};

const MessageNotification: FC<NotificationProps> = ({ notification, onRead }) => {
  const handleNotificationRead = (): void => {
    onRead(notification.id);
  };

  return (
    <div className={styles['text-notification']} onClick={handleNotificationRead}>
      <p className={styles['text-notification-message']}>{notification.message}</p>
      <p className={styles['timestamp']}>{getHowLongAgoString(notification.createdAt)}</p>
    </div>
  );
};

export { MessageNotification };
