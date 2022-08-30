import { AuthNotification } from './auth-notification.config.ts';

enum AuthNotificationMessage {
  SIGN_UP_SUCCESS = 'Please check your inbox, an address verification link has been sent to your email.',
  ACCOUNT_VERIFICATION_LETTER_SENT_DEFAULT = 'The letter has been sent! Check your inbox',
  ACCOUNT_VERIFICATION_DONE_DEFAULT = 'Your email has been confirmed! You can now sign in',
  PASSWORD_RESET_LETTER_SENT_SUCCESS_DEFAULT = 'The letter has been sent! Check your inbox',
  PASSWORD_RESET_SUCCESS = 'Your password has successfully been reset! Feel free to sign in now',
}

const matchAuthNotificationWithMessage: Record<AuthNotification, AuthNotificationMessage> = {
  [AuthNotification.SIGN_UP_SUCCESS]: AuthNotificationMessage.SIGN_UP_SUCCESS,
  [AuthNotification.ACCOUNT_VERIFICATION_LETTER_SENT]: AuthNotificationMessage.ACCOUNT_VERIFICATION_LETTER_SENT_DEFAULT,
  [AuthNotification.ACCOUNT_VERIFICATION_SUCCESS]: AuthNotificationMessage.ACCOUNT_VERIFICATION_DONE_DEFAULT,
  [AuthNotification.PASSWORD_RESET_LETTER_SENT_SUCCESS]:
    AuthNotificationMessage.PASSWORD_RESET_LETTER_SENT_SUCCESS_DEFAULT,
  [AuthNotification.PASSWORD_RESET_SUCCESS]: AuthNotificationMessage.PASSWORD_RESET_SUCCESS,
};

export { matchAuthNotificationWithMessage };
