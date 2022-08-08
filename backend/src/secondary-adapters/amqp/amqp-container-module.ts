import { AsyncContainerModule, interfaces } from 'inversify';
import { CONTAINER_TYPES } from '../../shared/types/types';

import amqp, { Channel } from 'amqplib';

import { CONFIG } from '~/configuration/config';
import { AmqpChannel } from '../../shared/enums/amqp/amqp';

const amqpContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const amqpServer = CONFIG.APP.RABBITMQ_URL;
  const amqpChannel = await amqp.connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpChannel.STREAMLET);
  bind<Channel>(CONTAINER_TYPES.AmqpChannel).toConstantValue(amqpChannel);
});

export { amqpContainerModule };
