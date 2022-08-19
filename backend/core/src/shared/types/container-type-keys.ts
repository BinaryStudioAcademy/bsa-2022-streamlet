const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  VideoController: Symbol.for('VideoController'),
  ChannelController: Symbol.for('ChannelController'),
  ChannelService: Symbol.for('ChannelService'),
  ChannelRepository: Symbol.for('ChannelRepository'),
  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  VideoService: Symbol.for('VideoService'),
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  MailRepository: Symbol.for('MailRepository'),
  VideoRepository: Symbol.for('VideoRepository'),
  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
