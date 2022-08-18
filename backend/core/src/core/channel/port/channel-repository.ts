import { LiveStartResponseDto, ResetStreamingKeyResponseDto } from '~/shared/types/types';

export interface ChannelRepository {
  checkStreamingKey(key: string): Promise<LiveStartResponseDto | null>;
  resetStreamingKey(channelId: string): Promise<ResetStreamingKeyResponseDto | null>;
}
