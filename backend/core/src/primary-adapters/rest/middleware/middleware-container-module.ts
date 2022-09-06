import { ContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ChannelActionMiddleware } from './channel-action-middleware';

const middlewareContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChannelActionMiddleware>(CONTAINER_TYPES.ChannelActionMiddleware).to(ChannelActionMiddleware);
});

export { middlewareContainerModule };
