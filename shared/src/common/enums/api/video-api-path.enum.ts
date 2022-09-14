enum VideoApiPath {
  ROOT = '/',
  $ID = '/:videoId',
  VIEW = '/view',
  REACTION = '/react',
  COMMENT = '/comment',
  POPULAR = '/popular',
  SEARCH = '/search',
  REPLIES_COMMENT = '/comment/replies',
  SIMILAR_VIDEOS = '/similar',
  GET_MY_VIDEO = '/me',
}

enum VideoApiPathParams {
  ID = 'videoId',
}

export { VideoApiPath, VideoApiPathParams };
