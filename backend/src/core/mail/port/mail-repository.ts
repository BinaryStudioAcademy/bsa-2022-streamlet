import { MailRequestDto, MailResponseDto } from '~/shared/types/types';

export interface MailRepository {
  sendMail(mailRequestDto: MailRequestDto): Promise<MailResponseDto>;
}
