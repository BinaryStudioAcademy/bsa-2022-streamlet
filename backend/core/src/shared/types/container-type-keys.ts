const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  ProfileController: Symbol.for('ProfileController'),
  AuthController: Symbol.for('AuthController'),
  TagController: Symbol.for('TagController'),
  CategoryController: Symbol.for('CategoryController'),
  HealthcheckController: Symbol.for('HealthcheckController'),

  ChannelStreamingController: Symbol.for('ChannelStreamingController'),
  CreateVideoHistoryRecordMiddleware: Symbol.for('createVideoHistoryRecordMiddleware'),
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
  ResetPasswordService: Symbol.for('ResetPasswordService'),
  AccountVerificationService: Symbol.for('AccountVerificationService'),
  TagService: Symbol.for('TagService'),
  CategoryService: Symbol.for('CategoryService'),
  TagRepository: Symbol.for('TagRepository'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  ResetPasswordRepository: Symbol.for('ResetPasswordRepository'),
  MailRepository: Symbol.for('MailRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),
  ChannelStreamingRepository: Symbol.for('ChannelStreamingRepository'),
  ChannelCrudRepository: Symbol.for('ChannelCrudRepository'),
  ChannelSubscriptionRepository: Symbol.for('ChannelSubscriptionRepository'),
  HistoryRepository: Symbol.for('HistoryRepository'),
  HistoryController: Symbol.for('HistoryController'),
  HistoryService: Symbol.for('HistoryService'),
  VideoService: Symbol.for('VideoService'),
  VideoRepository: Symbol.for('VideoRepository'),
  VideoController: Symbol.for('VideoController'),
  ChatService: Symbol.for('ChatService'),
  ChatRepository: Symbol.for('ChatRepository'),
  ChatController: Symbol.for('ChatController'),
  ChannelService: Symbol.for('ChannelService'),
  ChannelRepository: Symbol.for('ChannelRepository'),
  ChannelController: Symbol.for('ChannelController'),

  FollowingService: Symbol.for('FollowingService'),
  FollowingController: Symbol.for('FollowingController'),

  ChannelOwnerMiddleWare: Symbol.for('ChannelOwnerMiddleware'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
