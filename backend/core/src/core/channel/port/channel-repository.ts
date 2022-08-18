import { LiveStartResponseDto, StreamingKeyResponseDto } from '~/shared/types/types';

export interface ChannelRepository {
  checkStreamingKey(key: string): Promise<LiveStartResponseDto | null>;
  getStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null>;
  resetStreamingKey(channelId: string): Promise<StreamingKeyResponseDto | null>;
}
