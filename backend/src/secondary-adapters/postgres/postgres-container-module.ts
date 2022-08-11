import { AsyncContainerModule, interfaces } from 'inversify';
import { UserRepository } from '../../core/user/port/user-repository';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { UserRepositoryAdapter } from './user/user-repository-adapter';
import { PrismaClient } from '@prisma/client';
import { encryption } from '~/shared/constants';
import bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { RefreshTokenRepositoryAdapter } from './refresh-token/refresh-token-repository-adapter';

const postgresContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const client = new PrismaClient();
  await client.$connect();
  client.$use(async (params, next) => {
    if (params.action == 'create' && params.model == 'User') {
      const user = { ...params.args.data };
      const salt = await bcrypt.genSalt(encryption.SALT_ROUNDS);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      params.args.data = user;
    }
    return next(params);
  });

  client.$use(async (params, next) => {
    if (params.action == 'create' && params.model == 'RefreshToken') {
      const token = { ...params.args.data };
      const salt = await bcrypt.genSalt(encryption.SALT_ROUNDS);
      const hash = await bcrypt.hash(token.token, salt);
      token.token = hash;
      params.args.data = token;
    }
    return next(params);
  });

  bind<UserRepository>(CONTAINER_TYPES.UserRepository).to(UserRepositoryAdapter);
  bind<RefreshTokenRepository>(CONTAINER_TYPES.RefreshTokenRepository).to(RefreshTokenRepositoryAdapter);
  bind<PrismaClient>(CONTAINER_TYPES.PrismaClient)
    .toConstantValue(client)
    .onDeactivation(async (client) => {
      await client.$disconnect();
    });
});

export { postgresContainerModule };
