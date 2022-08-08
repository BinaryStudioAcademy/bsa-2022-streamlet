import { RestorePasswordMail } from './restore-password-mail.type';
import { VerifyAccountMail } from './verify-account-mail.type';
import { WelcomeMail } from './welcome-mail.type';

type MailProps = RestorePasswordMail | VerifyAccountMail | WelcomeMail;

export { RestorePasswordMail, VerifyAccountMail, WelcomeMail, MailProps };
