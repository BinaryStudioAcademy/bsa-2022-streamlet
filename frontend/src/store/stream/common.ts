enum ActionType {
  CREATE_STREAM = 'stream/create-stream',
  UPLOAD_POSTER = 'stream/upload-poster',
  UPDATE_STREAM_DATA = 'stream/update-stream-data',
  GET_STREAM_DATA = 'stream/get-stream-data',
  SET_STREAMING_STATUS = 'stream/change-streaming-status',
  RESET_STREAMING_KEY = 'stream/reset-streaming-key',
  GET_MY_CHANNEL = 'stream/get-my-channel',
  SET_READINESS_TO_STREAM = 'stream/set-readiness-to-stream',
  RESET_TEMPORARY_POSTER = 'stream/reset-temporary-poster',
}

export { ActionType };
