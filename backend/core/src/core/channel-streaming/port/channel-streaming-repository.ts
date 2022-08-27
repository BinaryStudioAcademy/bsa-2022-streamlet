import { StreamingKey, Video } from '@prisma/client';

export interface ChannelStreamingRepository {
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getPendingStream(channelId: string): Promise<Video | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
}
