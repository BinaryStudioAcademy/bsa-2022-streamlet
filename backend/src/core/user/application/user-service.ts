import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { MailResponseDto, MailType, UserSignUpResponseDto } from 'shared/build';
import { MailRepository } from '~/core/mail/port/mail-repository';

type MailTestRequestDto = {
  email: string;
  name: string;
};

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private mailRepository: MailRepository;

  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.MailRepository) mailRepository: MailRepository,
  ) {
    this.userRepository = userRepository;
    this.mailRepository = mailRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  createUser(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.userRepository.createUser(userRequestDto);
  }

  // This method is only used for functionality testing. When registration method will be implemented,
  // this.mailRepository.sendEmail() will be called  from there.
  testSendingEmail(mailTestRequestDto: MailTestRequestDto): Promise<MailResponseDto> {
    return this.mailRepository.sendEmail({
      receiver: mailTestRequestDto.email,
      type: MailType.WELCOME,
      props: {
        name: mailTestRequestDto.name,
      },
    });
  }
}
