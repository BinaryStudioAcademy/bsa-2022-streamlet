import { CONFIG } from './config';
import { connect, Channel } from 'amqplib';
import { AmqpQueue } from '~/shared/enums/enums';

const amqpConnect = async (): Promise<Channel> => {
  const amqpServer = CONFIG.rabbitmqUrl;

  const amqpChannel = await connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER);
  await amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER_BROADCAST);

  return amqpChannel;
};

export { amqpConnect };
