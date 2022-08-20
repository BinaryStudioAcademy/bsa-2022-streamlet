import { FC, NotificationStreamStartResponseDto } from 'common/types/types';
import DefaultUserAvatar from 'assets/img/default-user-avatar.jpg';
import { Link } from 'react-router-dom';
import { getHowLongAgoString } from 'helpers/helpers';

import styles from './styles.module.scss';
import { ApiPath } from 'shared/build';

type NotificationProps = {
  notification: NotificationStreamStartResponseDto;
  onRead(id: string): void;
};

const NewStreamNotification: FC<NotificationProps> = ({ notification, onRead }) => {
  const handleNotificationRead = (): void => {
    onRead(notification.id);
  };

  return (
    <Link className={styles['link']} to={`${ApiPath.VIDEO}${notification.link}`}>
      <div className={styles['notification']} onClick={handleNotificationRead}>
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

export { NewStreamNotification };
