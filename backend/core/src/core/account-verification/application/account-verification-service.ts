import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';

import { MailRepository } from '~/core/mail/port/mail-repository';
import { commonFrontendPaths, MailType } from 'shared/build';
import { generateJwt, verifyJwt } from '~/shared/helpers';
import { CONFIG } from '~/configuration/config';

@injectable()
export class AccountVerificationService {
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) private userRepository: UserRepository,
    @inject(CONTAINER_TYPES.MailRepository) private mailRepository: MailRepository,
  ) {}

  async sendVerificationEmail(user: User): Promise<void> {
    await this.mailRepository.sendMail({
      type: MailType.VERIFY_ACCOUNT,
      props: { verificationLink: await this.generateVerificationLink(user) },
      receiver: user.email,
    });
  }

  async generateVerificationLink(user: User): Promise<string> {
    const token = await generateJwt<VerificationUserJwtPayload>({
      payload: {
        userId: user.id,
      },
      lifetime: CONFIG.ENCRYPTION.VERIFICATION_TOKEN_LIFETIME,
      secret: CONFIG.ENCRYPTION.VERIFICATION_TOKEN_SECRET,
    });
    return `${CONFIG.CLIENT_INFO.URL}${commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.path}?${
      commonFrontendPaths.auth.ACCOUNT_VERIFICATION_CONFIRM.queryParamNames.token
    }=${encodeURIComponent(token)}`;
  }

  async getConfirmTokenUser(token: string): Promise<User | null> {
    try {
      const tokenPayload = await verifyJwt<VerificationUserJwtPayload>({
        jwt: token,
        secret: CONFIG.ENCRYPTION.VERIFICATION_TOKEN_SECRET,
      });

      const user = await this.userRepository.getById(tokenPayload.userId);
      return user;
    } catch {
      return null;
    }
  }
}

type VerificationUserJwtPayload = {
  userId: string;
};
