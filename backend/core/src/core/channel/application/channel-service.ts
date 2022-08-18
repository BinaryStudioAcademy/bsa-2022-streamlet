import { inject, injectable } from 'inversify';
import { LiveStartResponseDto, ResetStreamingKeyResponseDto } from '~/shared/types/types';
import { AmqpQueue } from '~/shared/enums/enums';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelRepository } from '../port/channel-repository';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';
import { AmqpChannelPort } from '~/core/common/port/amqp-channel';

@injectable()
export class ChannelService {
  private channelRepository: ChannelRepository;
  private amqpChannel: AmqpChannelPort;

  constructor(
    @inject(CONTAINER_TYPES.ChannelRepository) channelRepository: ChannelRepository,
    @inject(CONTAINER_TYPES.AmqpChannelAdapter) amqpChannel: AmqpChannelPort,
  ) {
    this.channelRepository = channelRepository;
    this.amqpChannel = amqpChannel;
  }

  async prepareStreamStart(key: string): Promise<LiveStartResponseDto> {
    const keyCheckResponse = await this.channelRepository.checkStreamingKey(key);
    if (keyCheckResponse === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }
    this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(JSON.stringify({ streamingKey: key })),
    });
    return keyCheckResponse;
  }

  async prepareStreamEnd(key: string): Promise<boolean> {
    return this.amqpChannel.sendToQueue({
      queue: AmqpQueue.STREAM_TRANSCODER,
      content: Buffer.from(JSON.stringify({ streamingKey: key })),
    });
  }

  async resetStreamingKey(channelId: string): Promise<ResetStreamingKeyResponseDto> {
    const keyResetResponse = await this.channelRepository.resetStreamingKey(channelId);
    if (keyResetResponse === null) {
      throw new NotFound('Invalid channel id');
    }

    return keyResetResponse;
  }
}
