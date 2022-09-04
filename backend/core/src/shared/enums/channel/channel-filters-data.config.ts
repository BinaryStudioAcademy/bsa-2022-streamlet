import { SortByFilterId } from 'shared/build';

interface SortByOption {
  liveViews?: string;
  videoViews?: string;
  createdAt?: string;
}

const matchChannelFilterSortBy: Record<SortByFilterId, SortByOption[]> = {
  [SortByFilterId.DEFAULT]: [],
  [SortByFilterId.RATING]: [],
  [SortByFilterId.RELEVANCE]: [],
  [SortByFilterId.UPLOAD_DATE]: [{ createdAt: 'desc' }],
  [SortByFilterId.VIEW_COUNT]: [],
};

export { matchChannelFilterSortBy, SortByOption };
