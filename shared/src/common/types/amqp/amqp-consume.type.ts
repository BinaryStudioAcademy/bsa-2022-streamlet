import { AmqpChannel } from '~/common/enums/enums';
import { Options } from 'amqplib';

type AmqpConsumeDto = {
  channel: AmqpChannel;
  onMessage: (data: Buffer | null) => void;
  options?: Options.Publish | undefined;
};

export { type AmqpConsumeDto };
