const CONTAINER_TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),

  PrismaClient: Symbol.for('PrismaClient'),
  Cloudinary: Symbol.for('Cloudinary'),
  CloudinaryAdapter: Symbol.for('CloudinaryAdapter'),
};

export { CONTAINER_TYPES };
