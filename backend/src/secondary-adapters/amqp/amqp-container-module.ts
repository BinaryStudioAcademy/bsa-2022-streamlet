import amqp, { Channel } from 'amqplib';
import { AsyncContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { CONFIG } from '~/configuration/config';
import { AmqpChannelAdapter } from './channel/amqp-channel-adapter';
import { AmqpChannel } from '../../shared/enums/amqp/amqp';
import { AmqpChannelPort } from '~/core/user/port/amqp-channel';

const amqpContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const amqpServer = CONFIG.APP.RABBITMQ_URL;
  const amqpChannel = await amqp.connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpChannel.STREAMLET);

  bind<AmqpChannelPort>(CONTAINER_TYPES.AmqpChannelAdapter).to(AmqpChannelAdapter);
  bind<Channel>(CONTAINER_TYPES.AmqpChannel).toConstantValue(amqpChannel);
});

export { amqpContainerModule };
