import { Store, iNotification, NotificationContent } from 'react-notifications-component';
import 'react-notifications-component/dist/scss/notification.scss';
import { ToastNotification } from './toast-notification';
import { ToastNotificationParams } from 'common/types/types';

const createToastNotification = (props: ToastNotificationParams): void => {
  const { type, durationMs } = props;
  const notification: iNotification = {
    content: ToastNotification(props) as NotificationContent,
    insert: 'bottom',
    container: 'bottom-right',
    animationIn: ['animate__animated animate__fadeIn'],
    animationOut: ['animate__animated animate__fadeOut'],
    dismiss: { duration: durationMs || 3000 },
  };
  Store.addNotification({ ...notification, type });
};

export { createToastNotification };
