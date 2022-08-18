import { LiveEndResponseDto, LiveStartResponseDto, ResetStreamingKeyResponseDto } from '~/shared/types/types';

export interface ChannelRepository {
  checkStreamingKey(key: string): Promise<LiveStartResponseDto | null>;
  finishStream(key: string): Promise<LiveEndResponseDto | null>;
  resetStreamingKey(channelId: string): Promise<ResetStreamingKeyResponseDto | null>;
}
