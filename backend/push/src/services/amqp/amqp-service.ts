import { Channel } from 'amqplib';
import { amqpConnect } from '~/config/amqp-connection';
import { logger } from '~/config/logger';
import { AmqpConsumeDto, AmqpSendToQueueDto } from '~/shared/types/ampq/ampq';

class AmqpService {
  public amqpChannel!: Channel;

  async connect(): Promise<void> {
    this.amqpChannel = (await amqpConnect()) as Channel;
  }

  async sendToQueue({ queue, content, options }: AmqpSendToQueueDto): Promise<boolean> {
    if (!this.amqpChannel) {
      logger.warn('Channel closed');
    }
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

export const amqpService = new AmqpService();
