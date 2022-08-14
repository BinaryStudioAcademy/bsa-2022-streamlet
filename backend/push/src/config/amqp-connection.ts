import { CONFIG } from './config';
import { connect, Channel, Connection } from 'amqplib';
import { AmqpQueue } from '~/shared/enums/enums';
import { logger } from './logger';
import { timeout } from '../helpers/timeout';
import { AMQP_CONNECTION_TRIES } from '~/shared/constants/amqp/connection-tries';
import { geometricProgressionByIndex } from '~/helpers/geometric-progression';
import { AmqpConnectionError } from 'shared/build';

const tryConnect = async (tries = 1): Promise<Connection | undefined> => {
  const amqpServer = CONFIG.rabbitmqUrl;
  if (tries >= AMQP_CONNECTION_TRIES) {
    return;
  }
  try {
    const connection = await connect(amqpServer);
    logger.info('Connect to RabbitMQ success!');
    return connection;
  } catch {
    logger.info(`Trying to reconnect... Atempt ${tries}`);
    await timeout(geometricProgressionByIndex(2, tries, 0.5) * 1000);
    return tryConnect(++tries);
  }
};

const amqpConnect = async (): Promise<Channel> => {
  logger.info('Connecting to Rabbitmq...');
  const connection: Connection | undefined = await tryConnect();
  if (!connection) {
    throw new AmqpConnectionError();
  }

  const amqpChannel = await connection.createChannel();
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER);
  amqpChannel.assertQueue(AmqpQueue.NOTIFY_USER_BROADCAST);

  return amqpChannel;
};

export { amqpConnect };
