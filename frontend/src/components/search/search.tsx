import { FC, VideoCard as VideoCardType, ChannelCard as ChannelCardType } from 'common/types/types';
import { DataStatus, LoaderSize } from 'common/enums/enums';
import { useEffect, useSearchParams, useAppDispatch, useAppSelector, useCallback, useMemo } from 'hooks/hooks';
import { Loader } from 'components/common/common';
import { FilterBar, FilterSidebar, ResultNotFound, VideoCard, ChannelCard } from './components/components';
import { SearchQueryParam, FilterType, SearchState } from './config/config';
import { searchActions } from 'store/actions';
import {
  matchSearchQueryParamWithFilterType,
  matchSearchQueryParamWithDefaultFilterId,
  getFilterFromSearchParams,
} from './helpers';

import styles from './styles.module.scss';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      searchText,
      activeFilterId,
      results: {
        videos: { list: videosList, total: videosTotal },
        channels: { list: channelsList, total: channelsTotal },
        dataStatus,
      },
    },
    theme: { isLightTheme },
    user,
    subscriptionsList,
  } = useAppSelector((state) => ({
    search: state.search,
    theme: state.theme,
    user: state.auth.user,
    subscriptionsList: state.subscriptions.subscriptionsData.subscriptionsList.ids,
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const hasUser = Boolean(user);

  const handleSetSearchText = useCallback((v: string) => dispatch(searchActions.setSearchText(v)), [dispatch]);
  const handleSetActiveFilterIds = useCallback(
    (filterIds: Partial<SearchState['activeFilterId']>) => dispatch(searchActions.setActiveFilterIds(filterIds)),
    [dispatch],
  );

  const handleGetVideoFilter = useMemo((): Partial<Record<SearchQueryParam, string>> => {
    const currentSearchState = {
      [FilterType.SEARCH_TEXT]: searchText,
      ...activeFilterId,
    };
    return Object.values(SearchQueryParam).reduce((prev, curr) => {
      const currId = currentSearchState[matchSearchQueryParamWithFilterType[curr]];
      const defaultId = matchSearchQueryParamWithDefaultFilterId[curr];
      if (currId !== defaultId) {
        return {
          ...prev,
          [curr]: currId,
        };
      }
      return prev;
    }, {});
  }, [searchText, activeFilterId]);

  const handleSetSearchResults = useCallback(() => {
    dispatch(searchActions.setSearchResults({ searchParamURL: searchParams.toString() }));
  }, [searchParams, dispatch]);

  useEffect(() => {
    const currentFilterFromURL = getFilterFromSearchParams(searchParams);

    if (FilterType.SEARCH_TEXT in currentFilterFromURL) {
      handleSetSearchText(currentFilterFromURL[FilterType.SEARCH_TEXT] as string);
      delete currentFilterFromURL[FilterType.SEARCH_TEXT];
    }
    handleSetActiveFilterIds(currentFilterFromURL);
    handleSetSearchResults();

    return () => {
      dispatch(searchActions.clearSearchResults());
      dispatch(searchActions.setSearchText(''));
    };
  }, [searchParams, handleSetSearchText, handleSetActiveFilterIds, handleSetSearchResults, dispatch]);

  useEffect(() => {
    setSearchParams({ ...handleGetVideoFilter });
  }, [activeFilterId, setSearchParams, handleGetVideoFilter]);

  return (
    <div className={styles['search-page']}>
      <FilterBar />
      <div className={styles['search-page-wrapper']}>
        <FilterSidebar />
        <div className={styles['search-page-video-list']}>
          {dataStatus === DataStatus.PENDING ? (
            <Loader spinnerSize={LoaderSize.MD} />
          ) : (
            <>
              {(!searchText || (videosTotal === 0 && channelsTotal === 0)) && <ResultNotFound />}
              {channelsList.map((c: ChannelCardType) => (
                <ChannelCard
                  key={c.id}
                  channel={c}
                  hasUser={hasUser}
                  isCurrentUserSubscribed={subscriptionsList.includes(c.id)}
                />
              ))}
              {videosList.map((c: VideoCardType) => (
                <VideoCard key={c.id} video={c} isLightTheme={isLightTheme} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { Search };
