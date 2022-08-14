import { CONFIG } from './config';
import { connect, Channel, Connection } from 'amqplib';
import { AmqpQueue } from '~/shared/enums/enums';
import { logger } from './logger';
import { timeout } from '../helpers/timeout';

const tryConnect = async (tries = 0): Promise<Connection> => {
  const amqpServer = CONFIG.rabbitmqUrl;
  if (tries >= 5) {
    logger.error('Connection failed');
    process.exit(0);
  }
  try {
    const connection = await connect(amqpServer);
    connection.on('close', async () => {
      logger.warn('Rabbitmq connection lost');
      await timeout(3000);
      return tryConnect(++tries);
    });
    logger.info('Connect to RabbitMQ success!');
    return connection;
  } catch {
    logger.info('Trying to reconnect...');
    await timeout(3000);
    return tryConnect(++tries);
  }
};

const amqpConnect = async (): Promise<Channel> => {
  logger.info('Connecting to Rabbitmq...');
  const connection: Connection = await tryConnect();

  const amqpChannel = await connection.createChannel();
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER);
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER_BROADCAST);

  return amqpChannel;
  // return await connection.createChannel()
  //   .then((channel => {
  //     channel.assertQueue(AmqpQueue.NOTIFY_USER);
  //     channel.assertQueue(AmqpQueue.NOTIFY_USER_BROADCAST);

  //     return channel;
  //   }));
};

export { amqpConnect };
