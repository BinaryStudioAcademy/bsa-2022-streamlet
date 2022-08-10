import { AmqpChannel } from '~/common/enums/enums';
import { Options } from 'amqplib';

type AmqpSendToQueueDto = {
  channel: AmqpChannel;
  content: Buffer;
  options?: Options.Publish | undefined;
};

export { type AmqpSendToQueueDto };
