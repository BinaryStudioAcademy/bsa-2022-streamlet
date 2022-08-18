import { CONFIG } from './config';
import { connect, Channel, Connection } from 'amqplib';
import { AmqpQueue } from '~/shared';
import { logger } from './logger';
import { timeout } from '~/helpers';
import { AMQP_CONNECTION_TRIES } from '~/shared/constants/amqp/connection-tries';
import { geometricProgressionByIndex } from '~/helpers';
import { AmqpConnectionError } from '~/shared';
import { amqpService } from '~/services';

const tryConnect = async (tries = 1): Promise<Connection> => {
  const amqpServer = CONFIG.rabbitmqUrl;
  if (tries >= AMQP_CONNECTION_TRIES) {
    throw new AmqpConnectionError();
  }
  try {
    const connection = await connect(amqpServer);

    connection.on('close', () => {
      logger.warn('Rabbitmq connection lost');
      amqpReconnect();
    });

    logger.info('Connect to RabbitMQ success!');
    return connection;
  } catch {
    logger.info(`Trying to reconnect... Atempt ${tries}`);
    await timeout(geometricProgressionByIndex(2, tries, 0.5) * 1000);
    return tryConnect(++tries);
  }
};

const amqpReconnect = async (): Promise<void> => {
  amqpService.connect(await amqpConnect());
};

const amqpConnect = async (): Promise<Channel> => {
  logger.info('Connecting to Rabbitmq...');
  const connection: Connection = await tryConnect();

  const amqpChannel = await connection.createChannel();
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER);
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER_BROADCAST);

  return amqpChannel;
};

export { amqpConnect };
