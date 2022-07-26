export const SocketEvents = {
  socket: {
    HANDSHAKE: 'handshake',
    HANDSHAKE_DONE: 'handshake-done',
  },
  notify: {
    NOTIFY_USER_DONE: 'notify-user-done',
    NOTIFY_BROADCAST_DONE: 'notify-broadcast-done',
    STREAM_OBS_STATUS: 'stream-obs-status',
  },
  chat: {
    NOTIFY_CHAT_ROOM_CHAT_IS_ENABLED_DONE: 'notify-chat-room-chat-is-enabled-done',
    NEW_MESSAGE_TO_CHAT_ROOM_DONE: 'send-message-to-chat-room-done',
    JOIN_ROOM: 'join-room',
    JOIN_ROOM_DONE: 'join-room-done',
    LEAVE_ROOM: 'leave-room',
    LEAVE_ROOM_DONE: 'leave-room-done',
    UPDATE_CHAT_PARTICIPANTS_DONE: 'update-chat-participants',
  },
  video: {
    UPDATE_LIVE_VIEWS_DONE: 'update-live-views-done',
  },
};
