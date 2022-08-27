const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  ProfileController: Symbol.for('ProfileController'),
  AuthController: Symbol.for('AuthController'),
  ChannelStreamingController: Symbol.for('ChannelStreamingController'),
  ChannelCrudController: Symbol.for('ChannelCrudController'),
  ChannelSubscriptionController: Symbol.for('ChannelSubscriptionController'),
  UserService: Symbol.for('UserService'),
  ProfileService: Symbol.for('ProfileService'),
  MailService: Symbol.for('MailService'),
  ChannelStreamingService: Symbol.for('ChannelStreamingService'),
  ChannelCrudService: Symbol.for('ChannelCrudService'),
  ChannelSubscriptionService: Symbol.for('ChannelSubscriptionService'),
  UserRepository: Symbol.for('UserRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  ResetPasswordService: Symbol.for('ResetPasswordService'),
  ResetPasswordRepository: Symbol.for('ResetPasswordRepository'),
  MailRepository: Symbol.for('MailRepository'),
  ChannelStreamingRepository: Symbol.for('ChannelStreamingRepository'),
  ChannelCrudRepository: Symbol.for('ChannelCrudRepository'),
  ChannelSubscriptionRepository: Symbol.for('ChannelSubscriptionRepository'),
  AccountVerificationService: Symbol.for('AccountVerificationService'),
  HistoryRepository: Symbol.for('HistoryRepository'),
  HistoryController: Symbol.for('HistoryController'),
  HistoryService: Symbol.for('HistoryService'),
  VideoService: Symbol.for('VideoService'),
  VideoRepository: Symbol.for('VideoRepository'),
  VideoController: Symbol.for('VideoController'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
