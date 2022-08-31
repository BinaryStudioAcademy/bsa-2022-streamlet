import { inject, injectable } from 'inversify';
import { User } from '@prisma/client';
import { CONTAINER_TYPES, MailTestRequestDto, UserSignUpRequestDto } from '~/shared/types/types';
import { UserRepository } from '~/core/user/port/user-repository';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';

import {
  MailResponseDto,
  MailType,
  ImageStorePresetType,
  ImageUploadResponseDto,
  UserUploadRequestDto,
  AmqpQueue,
} from 'shared/build';
import { ImageStorePort } from '~/core/common/port/image-store';

import { MailRepository } from '~/core/mail/port/mail-repository';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';

@injectable()
export class UserService {
  private userRepository: UserRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private mailRepository: MailRepository;
  private imageStore: ImageStorePort;
  private amqpChannel: AmqpChannelPort;
  private channelCrudRepository: ChannelCrudRepository;
  private channelStreamingRepository: ChannelStreamingRepository;

  // eslint-disable-next-line max-params
  constructor(
    @inject(CONTAINER_TYPES.UserRepository) userRepository: UserRepository,
    @inject(CONTAINER_TYPES.RefreshTokenRepository) refreshTokenRepository: RefreshTokenRepository,
    @inject(CONTAINER_TYPES.ImageStoreAdapter) imageStore: ImageStorePort,
    @inject(CONTAINER_TYPES.MailRepository) mailRepository: MailRepository,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
    @inject(CONTAINER_TYPES.ChannelCrudRepository) channelCrudRepository: ChannelCrudRepository,
    @inject(CONTAINER_TYPES.ChannelStreamingRepository) channelStreamingRepository: ChannelStreamingRepository,
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.imageStore = imageStore;
    this.mailRepository = mailRepository;
    this.amqpChannel = amqpChannel;
    this.channelCrudRepository = channelCrudRepository;
    this.channelStreamingRepository = channelStreamingRepository;
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  getUserByUsernameOrEmail(email: string, username: string): Promise<User | null> {
    return this.userRepository.getUserByUsernameOrEmail(email, username);
  }

  async createUser(userRequestDto: UserSignUpRequestDto): Promise<User> {
    const user = await this.userRepository.createUser(userRequestDto);
    const channel = await this.channelCrudRepository.createDefaultForUser(user, `${user.username}'s channel`);
    await this.channelStreamingRepository.createStreamingKey(channel.id);
    return user;
  }

  setIsActivated(shouldBeActivated: boolean, userId: string): Promise<void> {
    return this.userRepository.setIsActivated(shouldBeActivated, userId);
  }

  changeUserPassword(userId: string, newPassword: string): Promise<void> {
    return this.userRepository.changePassword(userId, newPassword);
  }

  createRefreshToken(userId: string): Promise<string> {
    return this.refreshTokenRepository.createForUser(userId);
  }

  uploadAvatar({ base64Str }: UserUploadRequestDto): Promise<ImageUploadResponseDto> {
    return this.imageStore.upload({ base64Str, type: ImageStorePresetType.AVATAR });
  }

  // This method is created only for testing purposes
  testSendingEmail(mailTestRequestDto: MailTestRequestDto): Promise<MailResponseDto> {
    return this.mailRepository.sendMail({
      receiver: mailTestRequestDto.email,
      type: MailType.WELCOME,
      props: {
        name: mailTestRequestDto.name,
      },
    });
  }

  notify(body: { data: { message: string } }): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.NOTIFY_USER,
      content: Buffer.from(JSON.stringify(body)),
    });
  }

  notifyBroadcast(body: { data: { message: string } }): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.NOTIFY_USER_BROADCAST,
      content: Buffer.from(JSON.stringify(body)),
    });
  }
}
