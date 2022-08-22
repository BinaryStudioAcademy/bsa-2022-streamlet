import { AuthNotification } from './auth-notification.config.ts';

enum AuthNotificationTitle {
  SIGN_UP_SUCCESS = 'Thanks! Your account has been successfully created.',
  ACCOUNT_VERIFICATION = 'Account verification',
  PASSWORD_RESET = 'Password reset',
}

const matchAuthNotificationWithTitle: Record<AuthNotification, AuthNotificationTitle> = {
  [AuthNotification.SIGN_UP_SUCCESS]: AuthNotificationTitle.SIGN_UP_SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: AuthNotificationTitle.ACCOUNT_VERIFICATION,
  [AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS]: AuthNotificationTitle.PASSWORD_RESET,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: AuthNotificationTitle.ACCOUNT_VERIFICATION,
  [AuthNotification.PASSWORD_RESET_SUCCESS]: AuthNotificationTitle.PASSWORD_RESET,
};

export { matchAuthNotificationWithTitle };
