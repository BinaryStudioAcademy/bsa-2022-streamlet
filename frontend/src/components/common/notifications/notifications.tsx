import { Store, iNotification, NOTIFICATION_TYPE } from 'react-notifications-component';
import 'react-notifications-component/dist/scss/notification.scss';
import { Notification } from './notification';

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

export { setNotification };
