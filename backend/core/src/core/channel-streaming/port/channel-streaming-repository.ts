import { StreamingKey, Video } from '@prisma/client';
import { VideoWithChannelAndAuthorDto } from '~/shared/types/video/video-with-channel-and-author-dto.type';

export interface ChannelStreamingRepository {
  getStreamingKey(props: Partial<StreamingKey>): Promise<StreamingKey | null>;
  getVideo(props: Partial<Video>): Promise<Video | null>;
  updateStreamingKey(channelId: string, streamingKey: string): Promise<StreamingKey | null>;
  getVideoById(videoId: string): Promise<VideoWithChannelAndAuthorDto | null>;
  changeChatToggle(videoId: string, chatToggle: boolean): Promise<Video | null>;
}
