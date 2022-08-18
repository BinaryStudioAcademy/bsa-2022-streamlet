import { inject, injectable } from 'inversify';
import { LiveEndResponseDto, LiveStartResponseDto, ResetStreamingKeyResponseDto } from 'shared/build';
import { CONTAINER_TYPES } from '~/shared/types/container-type-keys';
import { ChannelRepository } from '../port/channel-repository';
import { Forbidden } from '~/shared/exceptions/forbidden';
import { NotFound } from '~/shared/exceptions/not-found';

@injectable()
export class ChannelService {
  private channelRepository: ChannelRepository;

  constructor(@inject(CONTAINER_TYPES.ChannelRepository) channelRepository: ChannelRepository) {
    this.channelRepository = channelRepository;
  }

  async checkStreamingKey(key: string): Promise<LiveStartResponseDto> {
    const keyCheckResponse = await this.channelRepository.checkStreamingKey(key);
    if (keyCheckResponse === null) {
      throw new Forbidden('Invalid streaming key or no video created to stream on');
    }

    return keyCheckResponse;
  }

  async finishStream(key: string): Promise<LiveEndResponseDto> {
    const streamFinishResponse = await this.channelRepository.finishStream(key);
    if (streamFinishResponse === null) {
      throw new Forbidden('Invalid streaming key or no active stream');
    }

    return streamFinishResponse;
  }

  async resetStreamingKey(channelId: string): Promise<ResetStreamingKeyResponseDto> {
    const keyResetResponse = await this.channelRepository.resetStreamingKey(channelId);
    if (keyResetResponse === null) {
      throw new NotFound('Invalid channel id');
    }

    return keyResetResponse;
  }
}
