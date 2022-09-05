import { SortByFilterId } from 'shared/build';

interface ChannelSortByOption {
  createdAt?: string;
}

const matchChannelFilterSortBy: Record<SortByFilterId, ChannelSortByOption[]> = {
  [SortByFilterId.DEFAULT]: [],
  [SortByFilterId.RATING]: [],
  [SortByFilterId.RELEVANCE]: [],
  [SortByFilterId.UPLOAD_DATE]: [{ createdAt: 'desc' }],
  [SortByFilterId.VIEW_COUNT]: [],
};

export { matchChannelFilterSortBy, ChannelSortByOption };
