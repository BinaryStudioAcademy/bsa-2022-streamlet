export enum AmqpQueue {
  STREAMLET = 'streamlet',
  STREAMLET_STUDIO = 'streamlet-studio',
  NOTIFY_USER = 'notify-user',
  NOTIFY_USER_BROADCAST = 'notify-user-broadcast',
  NOTIFY_CHAT_ROOM = 'notify-chat-room',
  NOTIFY_CHAT_ROOM_CHAT_IS_ENABLED = 'notify-chat-room-chat-is-enabled',
  NEW_MESSAGE_TO_CHAT_ROOM = 'new-message-to-chat-room',
  STREAM_TRANSCODER = 'stream-transcoder',
  STREAM_INTERRUPTED = 'stream-interrupted',
  STREAM_INTERRUPTED_DONE = 'stream-interrupted-done', // unused
  STREAM_DATA = 'stream-data',
  SOCKETS_STREAM_CONNECTED = 'sockets-stream-connected',
  SOCKETS_STREAM_DISCONNECTED = 'sockets-stream-disconnected',
  PREVIEW_STOPPED = 'preview-stopped',
}
