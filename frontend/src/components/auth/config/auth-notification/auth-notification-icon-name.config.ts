import { IconName } from 'common/enums/enums';
import { AuthNotification } from './auth-notification.config.ts';

const matchAuthNotificationWithIconName: Record<AuthNotification, IconName> = {
  [AuthNotification.SIGN_UP_SUCCESS]: IconName.BELL,
};

export { matchAuthNotificationWithIconName };
