import { CreateSubscriptionResponseDto } from '../../../shared/types/types';
import { StreamingKey, Video, Channel } from '@prisma/client';

export interface ChannelRepository {
  addSubscription(channelId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  removeSubscription(userId: string, videoId: string): Promise<CreateSubscriptionResponseDto | null>;
  getChannelById(id: string): Promise<Channel | null>;
  isUserSubscribe(channelId: string, userId: string): Promise<boolean>;
  isUserSubscribeByVideoId(videoId: string, userId: string): Promise<boolean>;
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getVideo(props: Partial<Video>): Promise<Video | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
}
