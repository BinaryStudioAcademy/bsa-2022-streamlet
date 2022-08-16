const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  ProfileController: Symbol.for('ProfileController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  ProfileService: Symbol.for('ProfileService'),
  MailService: Symbol.for('MailService'),
  UserRepository: Symbol.for('UserRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
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
