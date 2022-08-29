import { Channel, StreamingKey, Video } from '@prisma/client';
import { VideoStreamResponseBeforeTrimming } from '~/shared/types/stream/stream-info-before-trimming.type';
import { StreamKeyResponseBeforeTrimming } from '~/shared/types/types';

export interface ChannelStreamingRepository {
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getAuthorlId(props: Partial<StreamingKey>): Promise<StreamKeyResponseBeforeTrimming | null>;
  getPendingStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  getCurrentStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
  createStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming>;
  updateStream(videoId: string, props: Partial<Video>): Promise<VideoStreamResponseBeforeTrimming | null>;
  getOwnChannel(authorId: string): Promise<Channel | null>;
}
