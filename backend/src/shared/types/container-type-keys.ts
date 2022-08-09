const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  MailService: Symbol.for('MailService'),
  UserRepository: Symbol.for('UserRepository'),
  MailRepository: Symbol.for('MailRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  MailTransporter: Symbol.for('MailTransporter'),
};

export { CONTAINER_TYPES };
