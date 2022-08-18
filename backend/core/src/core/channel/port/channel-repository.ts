import { StreamingKey, Video } from '@prisma/client';

export interface ChannelRepository {
  getKeyRecord(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getVideo(props: Partial<Video>): Promise<Video | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
}
