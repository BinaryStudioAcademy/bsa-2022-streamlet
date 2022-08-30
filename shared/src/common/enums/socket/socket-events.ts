export const SocketEvents = {
  socket: {
    HANDSHAKE: 'handshake',
    HANDSHAKE_DONE: 'handshake-done',
  },
  notify: {
    NOTIFY_USER_DONE: 'notify-user-done',
    NOTIFY_BROADCAST_DONE: 'notify-broadcast-done',
    STREAM_TRANSCODER_DONE: 'stream-transcoder-done',
    STREAM_INTERRUPTED_DONE: 'stream-interrupted-done',
  },
  chat: {
    NEW_MESSAGE_TO_CHAT_ROOM_DONE: 'send-message-to-chat-room-done',
    JOIN_ROOM: 'join-room',
    JOIN_ROOM_DONE: 'join-room-done',
    LEAVE_ROOM: 'leave-room',
    LEAVE_ROOM_DONE: 'leave-room-done',
  },
  video: {
    UPDATE_LIVE_VIEWS_DONE: 'update-live-views-done',
  },
};
