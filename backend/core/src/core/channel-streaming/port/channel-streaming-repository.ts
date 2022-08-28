import { StreamingKey, Video } from '@prisma/client';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';

export interface ChannelStreamingRepository {
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getPendingStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  getCurrentStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
  createStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming>;
  updateStream(videoId: string, props: Partial<Video>): Promise<VideoStreamResponseBeforeTrimming | null>;
}
