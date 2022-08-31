import { StreamingStatus } from '@prisma/client';
import { DurationFilterId, DateFilterId, TypeFilterId, SortByFilterId } from 'shared/build';

type DurationOption = {
  lte: number | undefined;
  gte: number | undefined;
};

type DateOption = Date | undefined;

type SortByOption = Array<[string, string | undefined]>;

const matchVideoFilterDuration: Record<DurationFilterId, DurationOption> = {
  [DurationFilterId.UNDER_4_MINUTES]: {
    lte: 240,
    gte: undefined,
  },
  [DurationFilterId.ANY]: {
    lte: undefined,
    gte: undefined,
  },
  [DurationFilterId.FROM_4_TO_20_MINUTES]: {
    lte: 1200,
    gte: 240,
  },
  [DurationFilterId.OVER_20_MINUTES]: {
    lte: undefined,
    gte: 1200,
  },
};

const matchTimeValuesInMilliseconds = {
  [DateFilterId.LAST_HOUR]: 3600000,
  [DateFilterId.THIS_WEEK]: 604800000,
  [DateFilterId.THIS_MONTH]: 2592000000,
  [DateFilterId.THIS_YEAR]: 31557600000,
};

const matchVideoFilterDate: Record<DateFilterId, DateOption> = {
  [DateFilterId.ANYTIME]: undefined,
  [DateFilterId.LAST_HOUR]: new Date(new Date().getTime() - matchTimeValuesInMilliseconds[DateFilterId.LAST_HOUR]),
  [DateFilterId.TODAY]: new Date(new Date().toDateString()),
  [DateFilterId.THIS_WEEK]: new Date(new Date().getTime() - matchTimeValuesInMilliseconds[DateFilterId.THIS_WEEK]),
  [DateFilterId.THIS_MONTH]: new Date(new Date().getTime() - matchTimeValuesInMilliseconds[DateFilterId.THIS_MONTH]),
  [DateFilterId.THIS_YEAR]: new Date(new Date().getTime() - matchTimeValuesInMilliseconds[DateFilterId.THIS_YEAR]),
};

const matchVideoFilterType: Record<TypeFilterId, StreamingStatus[]> = {
  [TypeFilterId.ALL]: [StreamingStatus.finished, StreamingStatus.live],
  [TypeFilterId.CHANNEL]: [StreamingStatus.finished, StreamingStatus.live],
  [TypeFilterId.STREAM]: [StreamingStatus.live],
  [TypeFilterId.VIDEO]: [StreamingStatus.finished],
};

const matchVideoFilterSortBy: Record<SortByFilterId, SortByOption> = {
  [SortByFilterId.DEFAULT]: [],
  [SortByFilterId.RATING]: [],
  [SortByFilterId.RELEVANCE]: [],
  [SortByFilterId.UPLOAD_DATE]: [['publishedAt', 'desc']],
  [SortByFilterId.VIEW_COUNT]: [
    ['videoViews', 'desc'],
    ['liveViews', 'desc'],
  ],
};

export {
  matchVideoFilterDuration,
  matchVideoFilterDate,
  matchVideoFilterType,
  matchVideoFilterSortBy,
  DurationOption,
  DateOption,
  SortByOption,
};
