import { connect, Channel } from 'amqplib';
import { AsyncContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '../../shared/types/types';
import { CONFIG } from '~/configuration/config';
import { AmqpChannelAdapter } from './channel/amqp-channel-adapter';
import { AmqpQueue } from '../../shared/enums/amqp/amqp';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';

const amqpContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const amqpServer = CONFIG.APP.RABBITMQ_URL;
  const amqpChannel = await connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpQueue.STREAMLET);

  bind<AmqpChannelPort>(CONTAINER_TYPES.AmqpChannelAdapter).to(AmqpChannelAdapter);
  bind<Channel>(CONTAINER_TYPES.AmqpChannel).toConstantValue(amqpChannel);
});

export { amqpContainerModule };
