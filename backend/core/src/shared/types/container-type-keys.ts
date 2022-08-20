const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  ChannelController: Symbol.for('ChannelController'),
  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  ChannelService: Symbol.for('ChannelService'),
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  MailRepository: Symbol.for('MailRepository'),
  ChannelRepository: Symbol.for('ChannelRepository'),
  HistoryRepository: Symbol.for('HistoryRepository'),
  HistoryController: Symbol.for('HistoryController'),
  HistoryService: Symbol.for('HistoryService'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
