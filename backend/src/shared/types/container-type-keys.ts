const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  AmqpChannel: Symbol.for('AmqpChannel'),
  AmqpChannelAdapter: Symbol.for('AmqpChannelAdapter'),
};

export { CONTAINER_TYPES };
