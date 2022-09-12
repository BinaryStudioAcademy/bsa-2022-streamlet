import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { loadOfflineVideos } from 'store/following-page/actions';
import { Tab } from '../../tab';
import { MAX_VIDEOS_IN_BLOCK, SHOW_SEE_ALL_VIDEOS_AFTER } from '../constants';
import { VideosList } from '../videos-list/videos-list';
import styles from '../styles.module.scss';
import { SeeMoreCard } from '../see-more-card/see-more-card';

const OfflineBlock: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { areSubscriptionsStale, dataStatus, error, isLightTheme, videos } = useAppSelector(
    (state) => ({
      dataStatus: state.followingPage.offlineVideos.dataStatus,
      areSubscriptionsStale: state.followingPage.offlineVideos.areSubscriptionsStale,
      videos: state.followingPage.offlineVideos.videos,
      error: state.followingPage.offlineVideos.error,
      isLightTheme: state.theme.isLightTheme,
    }),
    shallowEqual,
  );

  const pageContainerRef = useOutletContext() as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadOfflineVideos());
    }
  }, [dataStatus, dispatch, areSubscriptionsStale]);

  if (videos.length === 0 && dataStatus === DataStatus.FULFILLED) return null;

  return (
    <div className={styles['block']}>
      {dataStatus === DataStatus.REJECTED && <ErrorBox message={error || ErrorMessage.DEFAULT} />}
      <VideosList title="Recently finished" dataStatus={dataStatus} isLightTheme={isLightTheme}>
        {videos
          .slice(0, MAX_VIDEOS_IN_BLOCK)
          .map((video) => {
            return <VideoCardMain video={video} isLightTheme={isLightTheme} key={video.id} />;
          })
          .concat(
            videos.length >= SHOW_SEE_ALL_VIDEOS_AFTER ? (
              <SeeMoreCard
                key="see-more"
                text="Show All"
                onBtnClick={(): void => {
                  pageContainerRef.current?.scrollTo(0, 0);
                  navigate(`../${Tab.OFFLINE}`);
                }}
              />
            ) : (
              []
            ),
          )}
      </VideosList>
    </div>
  );
};

export { OfflineBlock };
