import { StreamingStatus } from '@prisma/client';
import { DurationFilterId, DateFilterId, TypeFilterId, SortByFilterId } from 'shared/build';
import { returnSubtractedDate } from '~/shared/helpers/video/date-helper';

type DurationOption = {
  lte: number | undefined;
  gte: number | undefined;
};

type DateOption = Date | undefined;

interface VideoSortByOption {
  liveViews?: string;
  videoViews?: string;
  publishedAt?: string;
}

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
  [DateFilterId.ANYTIME]: 0,
  [DateFilterId.LAST_HOUR]: 3600 * 1000,
  [DateFilterId.THIS_WEEK]: 7 * 24 * 3600 * 1000,
  [DateFilterId.THIS_MONTH]: 30 * 24 * 3600 * 1000,
  [DateFilterId.THIS_YEAR]: 365 * 24 * 3600 * 1000,
};

const matchVideoFilterDate: Record<DateFilterId, DateOption> = {
  [DateFilterId.ANYTIME]: undefined,
  [DateFilterId.LAST_HOUR]: returnSubtractedDate(matchTimeValuesInMilliseconds[DateFilterId.LAST_HOUR]),
  [DateFilterId.TODAY]: returnSubtractedDate(),
  [DateFilterId.THIS_WEEK]: returnSubtractedDate(matchTimeValuesInMilliseconds[DateFilterId.THIS_WEEK]),
  [DateFilterId.THIS_MONTH]: returnSubtractedDate(matchTimeValuesInMilliseconds[DateFilterId.THIS_MONTH]),
  [DateFilterId.THIS_YEAR]: returnSubtractedDate(matchTimeValuesInMilliseconds[DateFilterId.THIS_YEAR]),
};

const matchVideoFilterType: Record<TypeFilterId, StreamingStatus[]> = {
  [TypeFilterId.ALL]: [StreamingStatus.finished, StreamingStatus.live],
  [TypeFilterId.CHANNEL]: [StreamingStatus.finished, StreamingStatus.live],
  [TypeFilterId.STREAM]: [StreamingStatus.live],
  [TypeFilterId.VIDEO]: [StreamingStatus.finished],
};

const matchVideoFilterSortBy: Record<SortByFilterId, VideoSortByOption[]> = {
  [SortByFilterId.DEFAULT]: [],
  [SortByFilterId.RATING]: [],
  [SortByFilterId.RELEVANCE]: [],
  [SortByFilterId.UPLOAD_DATE]: [{ publishedAt: 'desc' }],
  [SortByFilterId.VIEW_COUNT]: [{ liveViews: 'desc' }, { videoViews: 'desc' }],
};

export {
  matchVideoFilterDuration,
  matchTimeValuesInMilliseconds,
  matchVideoFilterDate,
  matchVideoFilterType,
  matchVideoFilterSortBy,
  DurationOption,
  DateOption,
  VideoSortByOption,
};
