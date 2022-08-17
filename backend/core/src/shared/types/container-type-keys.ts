const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  MailRepository: Symbol.for('MailRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
