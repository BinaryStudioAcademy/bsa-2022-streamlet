import { AsyncContainerModule, interfaces } from 'inversify';
import { UserRepository } from '../../core/user/port/user-repository';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { UserRepositoryAdapter } from './user/user-repository-adapter';
import { PrismaClient } from '@prisma/client';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { RefreshTokenRepositoryAdapter } from './refresh-token/refresh-token-repository-adapter';

const postgresContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const client = new PrismaClient();
  await client.$connect();

  bind<UserRepository>(CONTAINER_TYPES.UserRepository).to(UserRepositoryAdapter);
  bind<RefreshTokenRepository>(CONTAINER_TYPES.RefreshTokenRepository).to(RefreshTokenRepositoryAdapter);
  bind<PrismaClient>(CONTAINER_TYPES.PrismaClient)
    .toConstantValue(client)
    .onDeactivation(async (client) => {
      await client.$disconnect();
    });
});

export { postgresContainerModule };
