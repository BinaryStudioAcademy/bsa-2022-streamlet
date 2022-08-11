import { Channel } from 'amqplib';
import { amqpConnect } from '~/config/amqp-connection';
import { AmqpConsumeDto, AmqpSendToQueueDto } from '~/shared/types/ampq/ampq';

class AmqpService {
  private amqpChannel!: Channel;

  async connect(): Promise<void> {
    this.amqpChannel = await amqpConnect();
  }

  async sendToQueue({ channel, content, options }: AmqpSendToQueueDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue(channel, content, options);
  }

  async consume({ channel, onMessage, options }: AmqpConsumeDto): Promise<void> {
    await this.amqpChannel.consume(
      channel,
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

export { AmqpService };
