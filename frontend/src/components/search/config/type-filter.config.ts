import { TypeFilterId } from 'store/search/models';

const matchTypeFilterText: Record<TypeFilterId, string> = {
  [TypeFilterId.ALL]: 'all',
  [TypeFilterId.CHANNEL]: 'channel',
  [TypeFilterId.STREAM]: 'stream',
  [TypeFilterId.VIDEO]: 'video',
};

const allTypeFilters = [TypeFilterId.ALL, TypeFilterId.CHANNEL, TypeFilterId.STREAM, TypeFilterId.VIDEO].map(
  (filterId) => ({
    id: filterId,
    text: matchTypeFilterText[filterId],
  }),
);

export { TypeFilterId, allTypeFilters };
