import { Channel, Connection } from 'amqplib';
import { AmqpConsumeDto, AmqpQueue, AmqpSendToQueueDto } from '~/shared';
import { logger } from '~/config/logger';
import { tryConnect } from '~/config/amqp-connection';

export class AmqpService {
  public amqpChannel!: Channel;

  async connect(): Promise<void> {
    logger.info('Connecting to Rabbitmq...');
    const connection: Connection = await tryConnect();

    const amqpChannel = await connection.createChannel();

    await this.initQueues(amqpChannel);

    this.amqpChannel = amqpChannel;
  }

  async initQueues(amqpChannel: Channel): Promise<void> {
    await Promise.all([
      amqpChannel.assertQueue(AmqpQueue.STREAM_TRANSCODER),
      amqpChannel.assertQueue(AmqpQueue.STREAM_INTERRUPTED),
      amqpChannel.assertQueue(AmqpQueue.PREVIEW_STOPPED),
    ]);
  }

  async sendToQueue({ queue, content, options }: AmqpSendToQueueDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue(queue, content, options);
  }

  async consume({ queue, onMessage, options }: AmqpConsumeDto): Promise<void> {
    await this.amqpChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          this.amqpChannel.ack(msg);
          onMessage(msg.content);
        }
      },
      options,
    );
  }
}
