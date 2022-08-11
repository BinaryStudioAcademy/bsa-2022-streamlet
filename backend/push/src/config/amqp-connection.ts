import { CONFIG } from './config';
import { connect, Channel } from 'amqplib';
import { AmqpChannel } from '~/shared/enums/enums';

const amqpConnect = async (): Promise<Channel> => {
  const amqpServer = CONFIG.rabbitmqUrl;
  const amqpChannel = await connect(amqpServer).then((connection) => connection.createChannel());
  await amqpChannel.assertQueue(AmqpChannel.SOCKET);

  return amqpChannel;
};

export { amqpConnect };
