import { DurationFilterId } from 'store/search/models';

const matchDurationFilterText: Record<DurationFilterId, string> = {
  [DurationFilterId.ANY]: 'any',
  [DurationFilterId.UNDER_4_MINUTES]: 'under 4 minutes',
  [DurationFilterId.FROM_4_TO_20_MINUTES]: '4 - 20 minutes',
  [DurationFilterId.OVER_20_MINUTES]: 'over 20 minutes',
};

const allDurationFilters = [
  DurationFilterId.ANY,
  DurationFilterId.UNDER_4_MINUTES,
  DurationFilterId.FROM_4_TO_20_MINUTES,
  DurationFilterId.OVER_20_MINUTES,
].map((filterId) => ({
  id: filterId,
  text: matchDurationFilterText[filterId],
}));

export { DurationFilterId, allDurationFilters };
