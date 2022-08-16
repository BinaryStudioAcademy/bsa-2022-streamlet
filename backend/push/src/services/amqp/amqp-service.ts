import { Channel } from 'amqplib';
import { AmqpConsumeDto, AmqpSendToQueueDto } from '~/shared/types/ampq/ampq';

class AmqpService {
  public amqpChannel!: Channel;

  async connect(channel: Channel): Promise<void> {
    this.amqpChannel = channel;
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

export const amqpService = new AmqpService();
