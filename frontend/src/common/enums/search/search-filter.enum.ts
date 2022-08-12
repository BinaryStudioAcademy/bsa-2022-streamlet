const FilterType = [
  { text: 'channel', value: 'chnl' },
  { text: 'stream', value: 'strm' },
  { text: 'video', value: 'v' },
];

const FilterDate = [
  { text: 'last hour', value: 'lh' },
  { text: 'today', value: 'td' },
  { text: 'this week', value: 'tw' },
  { text: 'this month', value: 'tm' },
  { text: 'this year', value: 'ty' },
];

const FilterDuration = [
  { text: 'under 4 minutes', value: 't4m' },
  { text: '4 - 20 minutes', value: 'f4t20m' },
  { text: 'over 20 minutes', value: 'f20m' },
];

const SortBy = [
  { text: 'relevance', value: 'rel' },
  { text: 'upload date', value: 'upld' },
  { text: 'view count', value: 'vct' },
  { text: 'rating', value: 'rtg' },
];

export { FilterType, FilterDate, FilterDuration, SortBy };
