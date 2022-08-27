import { AsyncContainerModule, interfaces } from 'inversify';
import { UserRepository } from '../../core/user/port/user-repository';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { UserRepositoryAdapter } from './user/user-repository-adapter';
import { PrismaClient } from '@prisma/client';
import { RefreshTokenRepository } from '~/core/refresh-token/port/refresh-token-repository';
import { RefreshTokenRepositoryAdapter } from './refresh-token/refresh-token-repository-adapter';
import { ChannelStreamingRepository } from '~/core/channel-streaming/port/channel-streaming-repository';
import { ChannelStreamingRepositoryAdapter } from './channel-streaming/channel-streaming-repository-adapter';
import { ResetPasswordRepository } from '~/core/reset-password/port/reset-password-repository';
import { ResetPasswordRepositoryAdapter } from './reset-password/reset-password-repository-adapter';
import { ChannelCrudRepository } from '~/core/channel-crud/port/channel-crud-repository';
import { ChannelCrudRepositoryAdapter } from './channel-crud/channel-crud-repository-adapter';
import { ProfileRepository } from '~/core/profile/port/profile-repository';
import { ProfileRepositoryAdapter } from '~/secondary-adapters/postgres/profile/profile-repositoty-adapter';
import { HistoryRepository } from '../../core/history/port/history-repository';
import { HistoryRepositoryAdapter } from './history/history-repository-adapter';
import { VideoRepository } from '~/core/video/port/video-repository';
import { VideoRepositoryAdapter } from './video/video-repository-adapter';
import { ChannelSubscriptionRepository } from '~/core/channel-subscription/port/channel-subscription-repository';
import { ChannelSubscriptionRepositoryAdapter } from './channel-subscription/channel-subscription-repository-adapter';

const postgresContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const client = new PrismaClient();
  await client.$connect();

  bind<UserRepository>(CONTAINER_TYPES.UserRepository).to(UserRepositoryAdapter);
  bind<ProfileRepository>(CONTAINER_TYPES.ProfileRepository).to(ProfileRepositoryAdapter);
  bind<VideoRepository>(CONTAINER_TYPES.VideoRepository).to(VideoRepositoryAdapter);
  bind<RefreshTokenRepository>(CONTAINER_TYPES.RefreshTokenRepository).to(RefreshTokenRepositoryAdapter);
  bind<ResetPasswordRepository>(CONTAINER_TYPES.ResetPasswordRepository).to(ResetPasswordRepositoryAdapter);
  bind<ChannelStreamingRepository>(CONTAINER_TYPES.ChannelStreamingRepository).to(ChannelStreamingRepositoryAdapter);
  bind<ChannelCrudRepository>(CONTAINER_TYPES.ChannelCrudRepository).to(ChannelCrudRepositoryAdapter);
  bind<ChannelSubscriptionRepository>(CONTAINER_TYPES.ChannelSubscriptionRepository).to(
    ChannelSubscriptionRepositoryAdapter,
  );
  bind<HistoryRepository>(CONTAINER_TYPES.HistoryRepository).to(HistoryRepositoryAdapter);
  bind<PrismaClient>(CONTAINER_TYPES.PrismaClient)
    .toConstantValue(client)
    .onDeactivation(async (client) => {
      await client.$disconnect();
    });
});

export { postgresContainerModule };
