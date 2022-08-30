import { OwnChannelResponseDto, VideoStreamResponseDto } from 'shared/build';

enum ActionType {
  CREATE_STREAM = 'stream/create-stream',
  UPLOAD_POSTER = 'stream/upload-poster',
  UPDATE_STREAM_DATA = 'stream/update-stream-data',
  GET_STREAM_DATA = 'stream/get-stream-data',
  SET_STREAMING_STATUS = 'stream/change-streaming-status',
  RESET_STREAMING_KEY = 'stream/reset-streaming-key',
  GET_MY_CHANNEL = 'stream/get-my-channel',
}

type StreamData = {
  stream: VideoStreamResponseDto;
  channel: OwnChannelResponseDto;
  streamingKey: string;
};

export { ActionType, StreamData };
