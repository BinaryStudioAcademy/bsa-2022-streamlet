import { AppRoutes } from 'common/enums/app/app-route.enum';
import { Loader } from 'components/common/common';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { historyActions } from '../../store/actions';
import { VideoCard } from '../../components/search/components/video-card/video-card';

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

    dispatch(historyActions.getAllUserVideoHistoryRecord(null));
  }, [user, dispatch, navigate]);

  const historyData = useAppSelector((state) => {
    return state.history.history.data;
  });

  if (!historyData) {
    return <Loader hCentered={true} vCentered={true} spinnerSize={'lg'} />;
  }
  return (
    <div className={styles['history-page-container']}>
      {historyData.map((historyRecord) => {
        return <VideoCard video={historyRecord.video} isLightTheme={true} />;
      })}
    </div>
  );
};

export { HistoryPage };
