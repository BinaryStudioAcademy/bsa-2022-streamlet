import { AuthNotification } from './auth-notification.config.ts';

enum AuthNotificationMessage {
  SIGN_UP_SUCCESS = 'Please check your inbox, an address verification link has been sent to your email.',
}

const matchAuthNotificationWithMessage: Record<AuthNotification, AuthNotificationMessage> = {
  [AuthNotification.SIGN_UP_SUCCESS]: AuthNotificationMessage.SIGN_UP_SUCCESS,
};

export { matchAuthNotificationWithMessage };
