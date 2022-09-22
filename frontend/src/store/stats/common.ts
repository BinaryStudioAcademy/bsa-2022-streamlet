enum ActionType {
  ADD_VIDEO_STAT = 'stats/video/add',
  UPDATE_VIDEO_STAT = 'stats/video/update',
  CLEAR_VIDEO_STAT = 'stats/video/clear',
  SEND_VIDEO_STAT = 'stats/video/send',
  SEND_CHANNEL_STAT = 'stats/channel/send',
  SET_STATS_CONFIG_PERIOD = 'stats/config/set-period',
  CLEAR_CHANNEL_STATS_CHARTS = 'stats/channel-charts/clear/all',
  GET_CHANNEL_STATS_DATA = 'stats/channel-charts/get/all',
  UPDATE_PLAYER_TIME = 'stats/video/player/update-time',
  GET_CHANNEL_OVERVIEW = 'stats/channel/overview/get',
  CLEAR_CHANNEL_OVERVIEW = 'stats/channel/overview/clear',
}

export { ActionType };
