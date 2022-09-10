import { DataStatus, IconColor, IconName, NotificationType } from 'common/enums/enums';
import {
  FC,
  NotificationBaseResponseDto,
  NotificationMessageResponseDto,
  NotificationStreamStartResponseDto,
} from 'common/types/types';
import { Button, Icon } from 'components/common/common';
import { MouseEvent, RefObject } from 'react';
import { MessageNotification, NewStreamNotification } from './components/components';

import notificationDropdown from './styles.module.scss';

interface NotificationDropdownProps {
  dropdownRef: RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
  onClickDropdown: (e: MouseEvent<HTMLButtonElement>) => void;
  onCloseDropdown: () => void;
  notifications: NotificationBaseResponseDto[];
  dataStatus: DataStatus;
  total: number;
  loaded: number;
  onLoadNotifications: () => void;
  onReadNotification: (id: string) => void;
  onReadAllNotifications: () => void;
}

const NotificationDropdown: FC<NotificationDropdownProps> = ({
  dropdownRef,
  isDropdownOpen,
  onClickDropdown,
  onCloseDropdown,
  notifications,
  total,
  loaded,
  onLoadNotifications,
  onReadNotification,
  onReadAllNotifications,
}) => {
  const haveNotifications = Boolean(notifications.length);

  return (
    <div className={notificationDropdown['wrapper']}>
      <button
        className={notificationDropdown['bell']}
        data-tip={'Notification'}
        data-place="bottom"
        onClick={onClickDropdown}
      >
        <Icon color={IconColor.GRAY} name={IconName.ALARM} width="24" height="22" />
        {haveNotifications && <div className={notificationDropdown['unread-mark']} />}
      </button>
      {isDropdownOpen && (
        <div ref={dropdownRef} className={notificationDropdown['dropdown']}>
          <div className={notificationDropdown['header']}>
            <p className={notificationDropdown['title']}>Notifications</p>
            <div className={notificationDropdown['buttons']}>
              <Button
                className={notificationDropdown['mark-as-read']}
                content={<Icon name={IconName.MARK_AS_READ} width="25" height="25" />}
                onClick={onReadAllNotifications}
              />
              <Button
                className={notificationDropdown['close-mobile']}
                content={<Icon name={IconName.CLOSE} width="25" height="25" />}
                onClick={onCloseDropdown}
              />
            </div>
          </div>
          <div className={notificationDropdown['dropdown-body']}>
            <div className={notificationDropdown['notification-list']}>
              {haveNotifications ? (
                notifications.map((notification) => {
                  switch (notification.type) {
                    case NotificationType.STREAM_START: {
                      return (
                        <NewStreamNotification
                          notification={notification as NotificationStreamStartResponseDto}
                          onRead={onReadNotification}
                          key={notification.id}
                        />
                      );
                    }
                    case NotificationType.TEXT_MESSAGE: {
                      return (
                        <MessageNotification
                          notification={notification as NotificationMessageResponseDto}
                          onRead={onReadNotification}
                          key={notification.id}
                        />
                      );
                    }
                  }
                })
              ) : (
                <p className={notificationDropdown['placeholder']}>No notifications</p>
              )}
              {loaded < total && (
                <Button
                  className={notificationDropdown['load-more']}
                  content="Load more"
                  onClick={onLoadNotifications}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { NotificationDropdown };
