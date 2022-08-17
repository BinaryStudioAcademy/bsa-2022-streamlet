import { AmqpQueue } from '~/common/enums/enums';
import { Options } from 'amqplib';

type AmqpConsumeDto = {
  queue: AmqpQueue;
  onMessage: (data: Buffer | null) => void;
  options?: Options.Publish | undefined;
};

export { type AmqpConsumeDto };
