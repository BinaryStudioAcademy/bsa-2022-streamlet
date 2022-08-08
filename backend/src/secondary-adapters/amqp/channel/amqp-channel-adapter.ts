import { Channel, Options } from 'amqplib';
import { inject, injectable } from 'inversify';
import { AmqpChannel } from '../../../shared/enums/amqp/amqp';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';

@injectable()
export class AmqpChannelAdapter {
  private amqpChannel: Channel;

  constructor(@inject(CONTAINER_TYPES.AmqpChannel) amqpChannel: Channel) {
    this.amqpChannel = amqpChannel;
  }

  async sendToQueue({
    channel,
    content,
    options,
  }: {
    channel: AmqpChannel;
    content: Buffer;
    options?: Options.Publish | undefined; //TODO: create dto for method
  }): Promise<boolean> {
    return this.amqpChannel.sendToQueue(channel, content, options);
  }

  async consume({
    channel,
    onMessage,
    options,
  }: {
    channel: AmqpChannel;
    onMessage: (data: Buffer | null) => void;
    options?: Options.Publish | undefined;
  }): Promise<void> {
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
