import { Channel } from 'amqplib';
import { inject, injectable } from 'inversify';
import { AmqpChannel } from '~/core/user/port/amqp-channel';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { AmqpConsumeDto, AmqpSendToQueueDto } from '~/shared/types/types';

@injectable()
export class AmqpChannelAdapter implements AmqpChannel {
  private amqpChannel: Channel;

  constructor(@inject(CONTAINER_TYPES.AmqpChannel) amqpChannel: Channel) {
    this.amqpChannel = amqpChannel;
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
