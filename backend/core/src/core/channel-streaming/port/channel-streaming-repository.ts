import { StreamingKey, Video } from '@prisma/client';
import { VideoWithChannelAndAuthorDto } from '~/shared/types/video/video-with-channel-and-author-dto.type';

export interface ChannelStreamingRepository {
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
  createStreamingKey(channelId: string): Promise<StreamingKey>;
  getAuthorlId(props: Partial<StreamingKey>): Promise<StreamKeyResponseBeforeTrimming | null>;
  getPendingStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  getCurrentStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming | null>;
  createStream(channelId: string): Promise<VideoStreamResponseBeforeTrimming>;
  updateStream(videoId: string, props: Partial<Video>): Promise<VideoStreamResponseBeforeTrimming | null>;
  getOwnChannel(authorId: string): Promise<Channel | null>;
  getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null>;
  changeChatToggle(videoId: string, chatToggle: boolean): Promise<Video | null>;
}
