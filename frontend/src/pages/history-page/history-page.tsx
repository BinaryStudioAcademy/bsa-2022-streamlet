import { AppRoutes } from 'common/enums/app/app-route.enum';
import { Loader } from 'components/common/common';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { historyActions } from '../../store/actions';
import { VideoCard } from '../../components/search/components/video-card/video-card';

import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataStatus } from '../../common/enums/app/data-status.enum';
import { generateHistorySkeletons } from './common/skeleton/skeleton';

import styles from './styles.module.scss';
import { getDateStringAtDdMmYyyyFormat, isDateSameByDayMonthYear } from '../../helpers/date/date';

const HistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const isLightTheme = useAppSelector((state) => {
    return state.theme.isLightTheme;
  });

  const historyData = useAppSelector((state) => {
    return state.history.data;
  });

  const { isFirstHistoryPageLoad, currentPage, lastPage, dataStatus } = historyData;
  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }

    if (isFirstHistoryPageLoad && currentPage !== -1) {
      return;
    }

    dispatch(historyActions.getUserVideoHistoryRecord(1));
  }, [dispatch, navigate, user, isFirstHistoryPageLoad, currentPage]);

  const loadMore = (): void => {
    dispatch(historyActions.getUserVideoHistoryRecord(historyData.currentPage + 1));
  };

  const [sentryRef] = useInfiniteScroll({
    loading: historyData.dataStatus === DataStatus.PENDING,
    hasNextPage: currentPage < lastPage,
    onLoadMore: loadMore,
    disabled: !!historyData.error,
    rootMargin: '0px 0px 400px 0px',
  });

  if (dataStatus === DataStatus.PENDING && currentPage < 0) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  return (
    <div className={styles['history-page-container']}>
      {historyData.list.map((historyRecord, index) => {
        const { id, video, updatedAt } = historyRecord;

        if (!index) {
          return (
            <div key={id}>
              <p className={styles['date']}>{getDateStringAtDdMmYyyyFormat(updatedAt)}</p>
              <VideoCard key={id} video={video} isLightTheme={true} />;
            </div>
          );
        }
        const prevHistoryRecordUpdatedAt = historyData.list[index - 1].updatedAt;

        const isPrevAndCurrentHistoryUpdatedAtSame = isDateSameByDayMonthYear(prevHistoryRecordUpdatedAt, updatedAt);

        return isPrevAndCurrentHistoryUpdatedAtSame ? (
          <VideoCard key={id} video={video} isLightTheme={true} />
        ) : (
          <div key={id}>
            <p className={styles['date']}>{getDateStringAtDdMmYyyyFormat(prevHistoryRecordUpdatedAt)}</p>
            <VideoCard key={id} video={video} isLightTheme={true} />;
          </div>
        );
      })}

      <div ref={sentryRef}>
        {dataStatus === DataStatus.PENDING && currentPage === 1 && generateHistorySkeletons(isLightTheme)}
      </div>
    </div>
  );
};

export { HistoryPage };
