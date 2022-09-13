enum ActionType {
  GET_VIDEO = 'video/get',
  GET_COMMENT = 'comment/get',
  UPDATE_COMMENT = 'comment/update',
  DELETE_COMMENT = 'comment/delete',
  REACT = 'video/react',
  COMMENT = 'video/comment',
  UPDATE_LIVE_VIEWS = 'video/update-live-views',
  COMMENT_REACT = 'video/comment/react',
  GET_REPLIES_FOR_COMMENT = 'comment/replies/get',
  ADD_REPLY_FOR_COMMENT = 'comment/reply/add',
  RESET_VIDEO_PAGE = 'video/page/reset',
  ADD_VIEW = 'video/add-view',
}

export { ActionType };
