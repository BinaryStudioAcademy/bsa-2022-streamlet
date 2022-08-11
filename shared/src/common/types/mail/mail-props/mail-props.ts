import { RestorePasswordMail } from './restore-password-mail.type';
import { VerifyAccountMail } from './verify-account-mail.type';
import { WelcomeMail } from './welcome-mail.type';

type MailPropsType = RestorePasswordMail | VerifyAccountMail | WelcomeMail;

export { MailPropsType, RestorePasswordMail, VerifyAccountMail, WelcomeMail };
