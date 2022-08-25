const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  ChannelController: Symbol.for('ChannelController'),
  TagController: Symbol.for('TagController'),
  CategoryController: Symbol.for('CategoryController'),

  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  ChannelService: Symbol.for('ChannelService'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  ResetPasswordService: Symbol.for('ResetPasswordService'),
  AccountVerificationService: Symbol.for('AccountVerificationService'),
  TagService: Symbol.for('TagService'),
  CategoryService: Symbol.for('CategoryService'),

  UserRepository: Symbol.for('UserRepository'),
  TagRepository: Symbol.for('TagRepository'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  ResetPasswordRepository: Symbol.for('ResetPasswordRepository'),
  MailRepository: Symbol.for('MailRepository'),
  ChannelRepository: Symbol.for('ChannelRepository'),
  VideoRepository: Symbol.for('VideoRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
