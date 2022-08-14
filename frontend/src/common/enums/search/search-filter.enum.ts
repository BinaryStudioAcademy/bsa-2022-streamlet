import {
  FilterTypeTitle,
  FilterTypeValue,
  FilterDateTitle,
  FilterDateValue,
  FilterDurationTitle,
  FilterDurationValue,
  SortByTitle,
  SortByValue,
} from './filter/filter';

const FilterType = [
  { text: FilterTypeTitle.ALL, value: FilterTypeValue.ALL },
  { text: FilterTypeTitle.CHANNEL, value: FilterTypeValue.CHANNEL },
  { text: FilterTypeTitle.STREAM, value: FilterTypeValue.STREAM },
  { text: FilterTypeTitle.VIDEO, value: FilterTypeValue.VIDEO },
];

const FilterDate = [
  { text: FilterDateTitle.ANYTIME, value: FilterDateValue.ANYTIME },
  { text: FilterDateTitle.LAST_HOUR, value: FilterDateValue.LAST_HOUR },
  { text: FilterDateTitle.TODAY, value: FilterDateValue.TODAY },
  { text: FilterDateTitle.THIS_WEEK, value: FilterDateValue.THIS_WEEK },
  { text: FilterDateTitle.THIS_MONTH, value: FilterDateValue.THIS_MONTH },
  { text: FilterDateTitle.THIS_YEAR, value: FilterDateValue.THIS_YEAR },
];

const FilterDuration = [
  { text: FilterDurationTitle.ANY, value: FilterDurationValue.ANY },
  { text: FilterDurationTitle.UNDER_4_MINUTES, value: FilterDurationValue.UNDER_4_MINUTES },
  { text: FilterDurationTitle.FROM_4_TO_20_MINUTES, value: FilterDurationValue.FROM_4_TO_20_MINUTES },
  { text: FilterDurationTitle.OVER_20_MINUTES, value: FilterDurationValue.OVER_20_MINUTES },
];

const SortBy = [
  { text: SortByTitle.DEFAULT, value: SortByValue.DEFAULT },
  { text: SortByTitle.RELEVANCE, value: SortByValue.RELEVANCE },
  { text: SortByTitle.UPLOAD_DATE, value: SortByValue.UPLOAD_DATE },
  { text: SortByTitle.VIEW_COUNT, value: SortByValue.VIEW_COUNT },
  { text: SortByTitle.RATING, value: SortByValue.RATING },
];

export { FilterType, FilterDate, FilterDuration, SortBy };
