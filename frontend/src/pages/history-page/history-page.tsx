import { AppRoutes } from 'common/enums/app/app-route.enum';
import { Button, Icon, Loader } from 'components/common/common';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { historyActions } from '../../store/actions';

import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataStatus } from '../../common/enums/app/data-status.enum';
import { generateHistorySkeletons } from './common/skeleton/skeleton';
import { HistoryList } from './common/history-list/history-list';
import styles from './styles.module.scss';
import { IconName } from '../../common/enums/component/icon-name.enum';
import { IconColor } from '../../common/enums/component/icon-color.enum';

const HistoryPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => {
    return state.auth.user;
  });

  const isLightTheme = useAppSelector((state) => {
    return state.theme.isLightTheme;
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

  const handleDeleteAllHistory = (): void => {
    dispatch(historyActions.deleteAllUserHistory());
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

  if (historyData.dataStatus === DataStatus.PENDING && currentPage < 0) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }

  return (
    <div className={styles['history-page-container']}>
      <div className={styles['header']}>
        <Icon name={IconName.TIME_AGO} color={IconColor.GRAY} width={'40'} height={'40'}></Icon>
        <h2 className={styles['page-header']}>History</h2>
        <Button content={'clear all'} onClick={handleDeleteAllHistory} className={styles['delete-all-btn']} />
      </div>

      <div className={styles['history-list-container']}>
        {
          <HistoryList
            historyData={historyData}
            isLightTheme={isLightTheme}
            containerClassName={styles['history-list-container']}
          />
        }
        <div ref={sentryRef}>
          {historyData.dataStatus === DataStatus.PENDING && currentPage > 0 && (
            <>{generateHistorySkeletons(isLightTheme)}</>
          )}
        </div>
      </div>
    </div>
  );
};

export { HistoryPage };
