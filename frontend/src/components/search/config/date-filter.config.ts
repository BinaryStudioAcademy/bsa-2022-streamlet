import { DateFilterId } from 'store/search/models';

const matchDateFilterText: Record<DateFilterId, string> = {
  [DateFilterId.ANYTIME]: 'anytime',
  [DateFilterId.LAST_HOUR]: 'last hour',
  [DateFilterId.TODAY]: 'today',
  [DateFilterId.THIS_WEEK]: 'this week',
  [DateFilterId.THIS_MONTH]: 'this month',
  [DateFilterId.THIS_YEAR]: 'this year',
};

const allDateFilters = [
  DateFilterId.ANYTIME,
  DateFilterId.LAST_HOUR,
  DateFilterId.TODAY,
  DateFilterId.THIS_WEEK,
  DateFilterId.THIS_MONTH,
  DateFilterId.THIS_YEAR,
].map((filterId) => ({
  id: filterId,
  text: matchDateFilterText[filterId],
}));

export { DateFilterId, allDateFilters };
