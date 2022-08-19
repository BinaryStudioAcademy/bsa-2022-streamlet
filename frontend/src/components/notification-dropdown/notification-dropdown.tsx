import { IconColor, IconName } from 'common/enums/enums';
import { FC, NotificationListResponseDto } from 'common/types/types';
import { Button, Icon } from 'components/common/common';
import { Notification } from './components/components';

import notificationDropdown from './styles.module.scss';

interface NotificationDropdownProps {
  notifications: NotificationListResponseDto;
  onClose: () => void;
}

const NotificationDropdown: FC<NotificationDropdownProps> = ({ notifications, onClose }) => {
  const handleMarkAsRead = (): void => {
    notifications.notifications.map((notification) => {
      notification.isViewed = false;
    });
    // Will be replaced with store action when backend part is ready
  };

  const handleClose = (): void => {
    onClose();
  };

  const handleLoadMoreNotifications = (): void => {
    // Will be replaced with store action when backend part is ready
  };

  const handleNotificationRead = (id: string): void => {
    notifications.notifications.map((notification) => {
      if (notification.id === id) {
        notification.isViewed = false;
      }
    });
    // Will be replaced with store action when backend part is ready
  };

  const haveNotifications = Boolean(notifications.notifications.length);

  return (
    <div className={notificationDropdown['dropdown']}>
      <div className={notificationDropdown['header']}>
        <p className={notificationDropdown['title']}>Notifications</p>
        <div className={notificationDropdown['buttons']}>
          <Button
            className={notificationDropdown['mark-as-read']}
            content={<Icon color={IconColor.WHITE} name={IconName.MARK_AS_READ} width="25" height="25" />}
            onClick={handleMarkAsRead}
          />
          <Button
            content={<Icon color={IconColor.WHITE} name={IconName.CLOSE} width="25" height="25" />}
            onClick={handleClose}
          />
        </div>
      </div>
      <div className={notificationDropdown['dropdown-body']}>
        <div className={notificationDropdown['notification-list']}>
          {haveNotifications ? (
            notifications.notifications.map((notification) => {
              return <Notification notification={notification} onRead={handleNotificationRead} key={notification.id} />;
            })
          ) : (
            <p className={notificationDropdown['placeholder']}>No notifications</p>
          )}
          {notifications.total > 10 && (
            <Button
              className={notificationDropdown['load-more']}
              content="Load more"
              onClick={handleLoadMoreNotifications}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { NotificationDropdown };
