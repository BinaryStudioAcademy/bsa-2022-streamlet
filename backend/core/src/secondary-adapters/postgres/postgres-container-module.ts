import { AsyncContainerModule, interfaces } from 'inversify';
import { UserRepository } from '../../core/user/port/user-repository';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { UserRepositoryAdapter } from './user/user-repository-adapter';
import { PrismaClient } from '@prisma/client';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { RefreshTokenRepositoryAdapter } from './refresh-token/refresh-token-repository-adapter';
import { ChannelRepository } from '~/core/channel/port/channel-repository';
import { ChannelRepositoryAdapter } from './channel/channel-repository-adapter';
import { ResetPasswordRepository } from '~/core/reset-password/port/reset-password-repository';
import { ResetPasswordRepositoryAdapter } from './reset-password/reset-password-repository-adapter';
import { VideoRepositoryAdapter } from '~/secondary-adapters/postgres/video/video-repository-adapter';
import { VideoRepository } from '~/core/video/port/video-repository';

const postgresContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const client = new PrismaClient();
  await client.$connect();

  bind<UserRepository>(CONTAINER_TYPES.UserRepository).to(UserRepositoryAdapter);
  bind<RefreshTokenRepository>(CONTAINER_TYPES.RefreshTokenRepository).to(RefreshTokenRepositoryAdapter);
  bind<VideoRepository>(CONTAINER_TYPES.VideoRepository).to(VideoRepositoryAdapter);
  bind<ResetPasswordRepository>(CONTAINER_TYPES.ResetPasswordRepository).to(ResetPasswordRepositoryAdapter);
  bind<ChannelRepository>(CONTAINER_TYPES.ChannelRepository).to(ChannelRepositoryAdapter);
  bind<PrismaClient>(CONTAINER_TYPES.PrismaClient)
    .toConstantValue(client)
    .onDeactivation(async (client) => {
      await client.$disconnect();
    });
});

export { postgresContainerModule };
