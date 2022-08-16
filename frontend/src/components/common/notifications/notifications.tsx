import { Store, iNotification, NOTIFICATION_TYPE } from 'react-notifications-component';
import { FC } from 'common/types/types';
import 'react-notifications-component/dist/scss/notification.scss';
import { IconName, NotificationType } from 'common/enums/enums';
import { Notification } from './notification';
import { MouseEventHandler } from 'react';

interface iNotificationParams {
  type: NOTIFICATION_TYPE;
  iconName: string;
  title: string;
  message: string;
}

const getNotification = (props: iNotificationParams): JSX.Element => Notification(props);

const setNotification = (props: iNotificationParams): void => {
  const { type } = props;
  const notification: iNotification = {
    content: getNotification(props),
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated animate__fadeIn'],
    animationOut: ['animate__animated animate__fadeOut'],
    dismiss: { duration: 3000 },
  };
  Store.addNotification({ ...notification, type });
};

const createNotification = (type: NOTIFICATION_TYPE): MouseEventHandler<HTMLButtonElement> => {
  return () => {
    switch (type) {
      case NotificationType.INFO:
        setNotification({ type, iconName: IconName.INFO, title: 'Info', message: 'Test info' });
        break;
      case NotificationType.SUCCESS:
        setNotification({ type, iconName: IconName.SUCCESS, title: 'Success!', message: 'Test success' });
        break;
      case NotificationType.WARNING:
        setNotification({ type, iconName: IconName.WARNING, title: 'Warning!', message: 'Test warning' });
        break;
      case NotificationType.DANGER:
        setNotification({ type, iconName: IconName.EXCLAMATION, title: 'Error!', message: 'Test error' });
        break;
      default:
        setNotification({ type, iconName: IconName.ALARM, title: 'Default!', message: 'Test default' });
        break;
    }
  };
};

const Notifications: FC = () => {
  return (
    <div>
      <button onClick={createNotification(NotificationType.INFO)}>Info</button>
      <hr />
      <button onClick={createNotification(NotificationType.SUCCESS)}>Success</button>
      <hr />
      <button onClick={createNotification(NotificationType.WARNING)}>Warning</button>
      <hr />
      <button onClick={createNotification(NotificationType.DANGER)}>Error</button>
      <hr />
      <button onClick={createNotification(NotificationType.DEFAULT)}>Default</button>
    </div>
  );
};

export { Notifications, createNotification, setNotification };
