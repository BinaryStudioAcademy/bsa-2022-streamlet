import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { User } from '@prisma/client';
import { ResetPasswordRepository } from '../port/reset-password-repository';
import { MailRepository } from '~/core/mail/port/mail-repository';
import { commonFrontendPaths, MailType } from 'shared/build';
import { CONFIG } from '~/configuration/config';

@injectable()
export class ResetPasswordService {
  constructor(
    @inject(CONTAINER_TYPES.ResetPasswordRepository) private resetPasswordRepository: ResetPasswordRepository,
    @inject(CONTAINER_TYPES.MailRepository) private mail: MailRepository,
  ) {}

  async getResetTokenUser(resetToken: string): Promise<User | null> {
    return this.resetPasswordRepository.getResetTokenUser(resetToken);
  }

  async createForUser(userId: string): Promise<string> {
    return this.resetPasswordRepository.createTokenForUser(userId);
  }

  async notifyUser(userEmail: string, token: string): Promise<void> {
    await this.mail.sendMail({
      receiver: userEmail,
      type: MailType.RESTORE_PASSWORD,
      props: {
        resetLink: this.generateResetLink(token),
      },
    });
  }

  generateResetLink(token: string): string {
    return `${CONFIG.CLIENT_INFO.URL}${commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.path}?${
      commonFrontendPaths.auth.RESET_PASSWORD_CONFIRM.queryParamNames.token
    }=${encodeURIComponent(token)}`;
  }

  async removeTokensForUser(userId: string): Promise<void> {
    await this.resetPasswordRepository.removeForUser(userId);
  }
}
