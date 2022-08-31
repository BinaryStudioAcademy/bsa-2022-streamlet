import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Button, Loader, VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppDispatch, useAppSelector, useNavigate } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { loadLiveVideos } from 'store/following-page/actions';
import { BlockContainer } from '../block-container/block-container';
import { MAX_VIDEOS_IN_BLOCK, SHOW_SEE_ALL_VIDEOS_AFTER } from '../constants';
import { ScrollableVideosList } from '../scrollable-videos-list/scrollable-videos-list';
import styles from '../styles.module.scss';

const LiveBlock: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataStatus = useAppSelector((state) => state.followingPage.liveVideos.dataStatus);
  const areSubscriptionsStale = useAppSelector((state) => state.followingPage.liveVideos.areSubscriptionsStale);
  const videos = useAppSelector((state) => state.followingPage.liveVideos.videos);
  const error = useAppSelector((state) => state.followingPage.liveVideos.error);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);
  const pageContainerRef = useOutletContext() as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadLiveVideos());
    }
  }, [dataStatus, dispatch, areSubscriptionsStale]);

  if (videos.length === 0 && dataStatus === DataStatus.FULFILLED) return null;

  return (
    <BlockContainer title="New live streams">
      {dataStatus === DataStatus.REJECTED && <ErrorBox message={error || ErrorMessage.DEFAULT} />}
      {dataStatus === DataStatus.PENDING ? (
        <Loader hCentered vCentered spinnerSize={LoaderSize.SM} className={styles['spinner']} />
      ) : (
        <ScrollableVideosList>
          {videos.slice(0, MAX_VIDEOS_IN_BLOCK).map((video) => {
            return <VideoCardMain video={video} isLightTheme={isLightTheme} key={video.id} />;
          })}
        </ScrollableVideosList>
      )}
      {videos.length >= SHOW_SEE_ALL_VIDEOS_AFTER && (
        <Button
          content="See all live"
          className={styles['see-all-btn']}
          onClick={(): void => {
            pageContainerRef.current?.scrollTo(0, 0);
            navigate('../live');
          }}
        />
      )}
    </BlockContainer>
  );
};

export { LiveBlock };
