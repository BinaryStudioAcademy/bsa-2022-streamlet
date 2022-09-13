enum ActionType {
  GET_VIDEOS = 'videos/get-videos',
  GET_VIDEOS_BY_CATEGORY = '/videos/get-videos-by-category',
  GET_POPULAR_VIDEOS = '/videos/popular',
  GET_RECOMMENDED_VIDEOS = 'videos/recommended',
  RESET_PAGINATION_MAIN_PAGE = 'videos/reset-pagination',
  SET_NUMBER_OF_VIDEO_FOR_LOADING = 'videos/set-number-of',
  GET_GENERAL_VIDEOS = 'videos/get-general-videos',
  RESET_RECOMMENDED_VIDEOS = 'videos/reset-recommended',
  RESET_GENERAL_VIDEOS = 'videos/reset-general',
}

type PayloadForNumberItems = {
  numberOfItems: number;
};

export { ActionType, PayloadForNumberItems };
