import { AuthNotification } from './auth-notification.config.ts';

enum AuthNotificationTitle {
  SIGN_UP_SUCCESS = 'Thanks! Your account has been successfully created.',
}

const matchAuthNotificationWithTitle: Record<AuthNotification, AuthNotificationTitle> = {
  [AuthNotification.SIGN_UP_SUCCESS]: AuthNotificationTitle.SIGN_UP_SUCCESS,
};

export { matchAuthNotificationWithTitle };
