import { AmqpQueue } from '~/common/enums/enums';
import { Options } from 'amqplib';

type AmqpSendToQueueDto = {
  queue: AmqpQueue;
  content: Buffer;
  options?: Options.Publish | undefined;
};

export { type AmqpSendToQueueDto };
