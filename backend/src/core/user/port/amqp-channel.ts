import { AmqpSendToQueueDto, AmqpConsumeDto } from 'shared/build';

export interface AmqpChannel {
  sendToQueue(sendToQueueDto: AmqpSendToQueueDto): Promise<boolean>;
  consume(consumeDto: AmqpConsumeDto): Promise<void>;
}
