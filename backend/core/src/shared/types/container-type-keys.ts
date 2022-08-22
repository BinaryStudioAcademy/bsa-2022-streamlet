const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  ChannelStreamingController: Symbol.for('ChannelStreamingController'),
  ChannelCrudController: Symbol.for('ChannelCrudController'),
  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  ChannelStreamingService: Symbol.for('ChannelStreamingService'),
  ChannelCrudService: Symbol.for('ChannelCrudService'),
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  RefreshTokenRepository: Symbol.for('RefreshTokenRepository'),
  ResetPasswordService: Symbol.for('ResetPasswordService'),
  ResetPasswordRepository: Symbol.for('ResetPasswordRepository'),
  MailRepository: Symbol.for('MailRepository'),
  ChannelStreamingRepository: Symbol.for('ChannelStreamingRepository'),
  ChannelCrudRepository: Symbol.for('ChannelCrudRepository'),
  AccountVerificationService: Symbol.for('AccountVerificationService'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  ImageStoreAdapter: Symbol.for('CloudinaryAdapter'),
  MailTransporter: Symbol.for('MailTransporter'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
