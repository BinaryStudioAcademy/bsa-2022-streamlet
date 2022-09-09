import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Loader, VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { loadLiveVideos } from 'store/following-page/actions';
import { Tab } from '../../tab';
import { MAX_VIDEOS_IN_BLOCK, SHOW_SEE_ALL_VIDEOS_AFTER } from '../constants';
import { VideosList } from '../videos-list/videos-list';
import styles from '../styles.module.scss';
import { SeeMoreCard } from '../see-more-card/see-more-card';

const LiveBlock: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { areSubscriptionsStale, dataStatus, error, isLightTheme, videos } = useAppSelector(
    (state) => ({
      dataStatus: state.followingPage.liveVideos.dataStatus,
      areSubscriptionsStale: state.followingPage.liveVideos.areSubscriptionsStale,
      videos: state.followingPage.liveVideos.videos,
      error: state.followingPage.liveVideos.error,
      isLightTheme: state.theme.isLightTheme,
    }),
    shallowEqual,
  );

  const pageContainerRef = useOutletContext() as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadLiveVideos());
    }
  }, [dataStatus, dispatch, areSubscriptionsStale]);

  if (videos.length === 0 && dataStatus === DataStatus.FULFILLED) return null;

  return (
    <>
      {dataStatus === DataStatus.REJECTED && <ErrorBox message={error || ErrorMessage.DEFAULT} />}
      {dataStatus === DataStatus.PENDING ? (
        <Loader hCentered vCentered spinnerSize={LoaderSize.SM} className={styles['spinner']} />
      ) : (
        <VideosList title="New live streams">
          {videos
            .slice(0, MAX_VIDEOS_IN_BLOCK)
            .map((video) => {
              return <VideoCardMain video={video} isLightTheme={isLightTheme} key={video.id} />;
            })
            .concat(
              videos.length >= SHOW_SEE_ALL_VIDEOS_AFTER ? (
                <SeeMoreCard
                  text="Show All"
                  key="see-more"
                  onBtnClick={(): void => {
                    pageContainerRef.current?.scrollTo(0, 0);
                    navigate(`../${Tab.LIVE}`);
                  }}
                />
              ) : (
                []
              ),
            )}
        </VideosList>
      )}
    </>
  );
};

export { LiveBlock };
