enum ChannelStreamingApiPath {
  ROOT = '/',
  $ID = '/:channelId',
  CONNECT = '/connect',
  DISCONNECT = '/disconnect',
  STREAMING_KEY = '/streaming_key',
  RESET_STREAMING_KEY = '/reset_streaming_key',
  LIVE = '/live',
}

export { ChannelStreamingApiPath };
