enum ChannelStreamingApiPath {
  ROOT = '/',
  $CHANNEL_ID = '/:channelId',
  $STREAM_ID = '/:streamId',
  $USER_ID = '/:userId',
  CONNECT = '/connect',
  DISCONNECT = '/disconnect',
  STREAMING_KEY = '/streaming_key',
  RESET_STREAMING_KEY = '/reset_streaming_key',
  LIVE = '/live',
  UPLOAD_POSTER = '/upload-poster',
  EDIT_STREAM = '/edit-stream',
  STREAMING_INFO = '/streaming-info',
}

export { ChannelStreamingApiPath };
