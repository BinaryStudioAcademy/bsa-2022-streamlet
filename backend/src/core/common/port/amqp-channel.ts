import { AmqpSendToQueueDto, AmqpConsumeDto } from 'shared/build';

export interface AmqpChannelPort {
  sendToQueue(sendToQueueDto: AmqpSendToQueueDto): Promise<boolean>;
  consume(consumeDto: AmqpConsumeDto): Promise<void>;
}
