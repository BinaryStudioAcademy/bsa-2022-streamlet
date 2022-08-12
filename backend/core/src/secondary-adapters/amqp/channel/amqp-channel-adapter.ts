import { Channel } from 'amqplib';
import { inject, injectable } from 'inversify';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { AmqpConsumeDto, AmqpSendToQueueDto } from '~/shared/types/types';

@injectable()
export class AmqpChannelAdapter implements AmqpChannelPort {
  private amqpChannel: Channel;

  constructor(@inject(CONTAINER_TYPES.AmqpChannel) amqpChannel: Channel) {
    this.amqpChannel = amqpChannel;
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
