import { OwnChannelResponseDto, VideoStreamResponseDto } from '../types';

type StreamingInfoResponseDto = {
  channel: OwnChannelResponseDto;
  streamingKey: string;
  stream: VideoStreamResponseDto | null;
};

export { StreamingInfoResponseDto };
