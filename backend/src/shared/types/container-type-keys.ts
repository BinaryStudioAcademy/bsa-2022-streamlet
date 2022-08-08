const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  AmqpChannel: Symbol.for('AmqpChannel'),
};

export { CONTAINER_TYPES };
