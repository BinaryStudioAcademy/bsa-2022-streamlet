import { FC, NotificationBaseResponseDto } from 'common/types/types';
import DefaultUserAvatar from 'assets/img/default-user-avatar.jpg';
import { Link } from 'react-router-dom';
import { getHowLongAgoString } from 'helpers/helpers';

import styles from './styles.module.scss';

type NotificationProps = {
  notification: NotificationBaseResponseDto;
  onRead(id: string): void;
};

const Notification: FC<NotificationProps> = ({ notification, onRead }) => {
  const handleNotificationRead = (): void => {
    onRead(notification.id);
  };

  return (
    <Link className={styles['link']} to={`/video/${notification.link}`}>
      <div className={styles['notification']} onClick={handleNotificationRead}>
        <div className={`${styles['status']} ${!notification.isViewed && styles['status-unread']}`}></div>
        <img
          src={notification.avatar ?? DefaultUserAvatar}
          className={styles['avatar']}
          alt="channel-avatar"
          height="20"
          width="21"
        />
        <div className={styles['info']}>
          <p className={styles['message']}>
            {notification.username} has started streaming: {notification.videoName}
          </p>
          <p className={styles['timestamp']}>{getHowLongAgoString(notification.createdAt)}</p>
        </div>
        <img src={notification.videoPreview} className={styles['thumbnail']} alt="channel-avatar" width="60" />
      </div>
    </Link>
  );
};

export { Notification };
