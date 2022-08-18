import { Store, iNotification, NotificationContent } from 'react-notifications-component';
import 'react-notifications-component/dist/scss/notification.scss';
import { Notification } from './notification';
import { INotificationParams } from './config';

const setNotification = (props: INotificationParams): void => {
  const { type } = props;
  const notification: iNotification = {
    content: Notification(props) as NotificationContent,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated animate__fadeIn'],
    animationOut: ['animate__animated animate__fadeOut'],
    dismiss: { duration: 3000 },
  };
  Store.addNotification({ ...notification, type });
};

export { setNotification };
