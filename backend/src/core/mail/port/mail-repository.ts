import { MailRequestDto, MailResponseDto } from '~/shared/types/types';

export interface MailRepository {
  sendEmail(mailRequestDto: MailRequestDto): Promise<MailResponseDto>;
}
