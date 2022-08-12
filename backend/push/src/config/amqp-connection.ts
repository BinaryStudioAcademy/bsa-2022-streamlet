import { CONFIG } from './config';
import { connect, Channel } from 'amqplib';
import { AmqpQueue } from '~/shared/enums/enums';

const amqpConnect = async (): Promise<Channel> => {
  const amqpServer = CONFIG.rabbitmqUrl;

  const amqpChannel = await connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpQueue.SOCKET);
  await amqpChannel.assertQueue(AmqpQueue.SOCKET_ALL);

  return amqpChannel;
};

export { amqpConnect };
