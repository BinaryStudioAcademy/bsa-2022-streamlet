enum TypeFilterId {
  ALL = 'all',
  CHANNEL = 'chnl',
  STREAM = 'strm',
  VIDEO = 'v',
}

enum DateFilterId {
  ANYTIME = 'anytime',
  LAST_HOUR = 'lh',
  TODAY = 'td',
  THIS_WEEK = 'tw',
  THIS_MONTH = 'tm',
  THIS_YEAR = 'ty',
}

enum DurationFilterId {
  ANY = 'any',
  UNDER_4_MINUTES = 't4m',
  FROM_4_TO_20_MINUTES = 'f4t20m',
  OVER_20_MINUTES = 'f20m',
}

enum SortByFilterId {
  DEFAULT = 'default',
  RELEVANCE = 'rel',
  UPLOAD_DATE = 'upld',
  VIEW_COUNT = 'vct',
  RATING = 'rtg',
}

enum SearchQueryParam {
  DATE = 'date',
  DURATION = 'duration',
  TYPE = 'type',
  SORT_BY = 'sortBy',
  SEARCH_TEXT = 'search_query',
}

enum FilterType {
  TYPE = 'type',
  DATE = 'date',
  DURATION = 'duration',
  SORT_BY = 'sortBy',
  SEARCH_TEXT = 'searchText',
}

export { TypeFilterId, DateFilterId, DurationFilterId, SortByFilterId, SearchQueryParam, FilterType };
