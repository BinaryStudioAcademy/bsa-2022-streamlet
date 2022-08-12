const FilterType = [
  { name: 'CHANNEL', text: 'channel', value: 'chnl' },
  { name: 'STREAM', text: 'stream', value: 'strm' },
  { name: 'VIDEO', text: 'video', value: 'v' },
];

const FilterDate = [
  { name: 'LAST_HOUR', text: 'last hour', value: 'lh' },
  { name: 'TODAY', text: 'today', value: 'td' },
  { name: 'THIS_WEEK', text: 'this week', value: 'tw' },
  { name: 'THIS_MONTH', text: 'this month', value: 'tm' },
  { name: 'THIS_YEAR', text: 'this year', value: 'ty' },
];

const FilterDuration = [
  { name: 'UNDER_4_MINUTES', text: 'under 4 minutes', value: 't4m' },
  { name: 'FROM_4_TO_20_MINUTES', text: '4 - 20 minutes', value: 'f4t20m' },
  { name: 'OVER_20_MINUTES', text: 'over 20 minutes', value: 'f20m' },
];

const SortBy = [
  { name: 'RELEVANCE', text: 'relevance', value: 'rel' },
  { name: 'UPLOAD_DATE', text: 'upload date', value: 'upld' },
  { name: 'VIEW_COUNT', text: 'view count', value: 'vct' },
  { name: 'RATING', text: 'rating', value: 'rtg' },
];

export { FilterType, FilterDate, FilterDuration, SortBy };
