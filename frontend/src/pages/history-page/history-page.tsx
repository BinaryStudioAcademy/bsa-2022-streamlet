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

const HistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  useEffect(() => {
    if (!user) {
      navigate(AppRoutes.SIGN_IN, { replace: true });
      return;
    }

    dispatch(historyActions.getUserVideoHistoryRecord(1));
  }, [user, dispatch, navigate]);

  const historyData = useAppSelector((state) => {
    return state.history.data;
  });

  const loadMore = (): void => {
    dispatch(historyActions.getUserVideoHistoryRecord(historyData.currentPage + 1));
  };

  if (!historyData) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }
  const { currentPage, lastPage } = historyData;

  const [sentryRef] = useInfiniteScroll({
    loading: historyData.dataStatus === DataStatus.PENDING,
    hasNextPage: currentPage < lastPage,
    onLoadMore: loadMore,
    disabled: !!historyData.error,
    rootMargin: '0px 0px 400px 0px',
  });

  if (historyData.dataStatus === DataStatus.PENDING && !historyData.list.length) {
    generateHistorySkeletons();
  }

  return (
    <div className={styles['history-page-container']}>
      {historyData.list.map((historyRecord) => {
        return <VideoCard key={historyRecord.id} video={historyRecord.video} isLightTheme={true} />;
      })}
      {historyData.dataStatus === DataStatus.PENDING ? generateHistorySkeletons() : null}
      <div ref={sentryRef}>
        <Loader hCentered={true} vCentered={true} spinnerSize={'md'} />
      </div>
    </div>
  );
};

export { HistoryPage };
