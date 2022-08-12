import { FC } from 'common/types/types';
import React from 'react';
import DefaultUserAvatar from 'assets/img/default-user-avatar.jpg';
import { Link } from 'react-router-dom';

type NotificationData = {
  id: string;
  videoId: string;
  channelId: string;
  username: string;
  videoName: string;
  createdAt: string;
  isViewed: boolean;
  channelAvatar: string;
  videoPreview: string;
};

type NotificationProps = {
  notification: NotificationData;
  onRead(id: string): void;
};

const Notification: FC<NotificationProps> = ({ notification, onRead }) => {
  const handleNotificationRead = (): void => {
    onRead(notification.id);
  };

  return (
    <div className="notification" onClick={handleNotificationRead}>
      <div className={`notification__status--${notification.isViewed ? 'read' : 'unread'}`}></div>
      <Link to={`/channel/${notification.channelId}`}>
        <img
          src={notification.channelAvatar ?? DefaultUserAvatar}
          className="notification__avatar"
          alt="channel-avatar"
          height="20"
          width="21"
        />
      </Link>
    </div>
  );
};

export { Notification };
