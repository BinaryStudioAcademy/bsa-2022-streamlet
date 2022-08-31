import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect } from 'react';
import { loadOfflineVideos } from 'store/following-page/actions';
import { NoVideosYet } from '../common/no-videos-yet/no-videos-yet';

const OfflineVideosTab: FC = () => {
  const dispatch = useAppDispatch();
  const dataStatus = useAppSelector((state) => state.followingPage.offlineVideos.dataStatus);
  const areSubscriptionsStale = useAppSelector((state) => state.followingPage.offlineVideos.areSubscriptionsStale);
  const videos = useAppSelector((state) => state.followingPage.offlineVideos.videos);
  const error = useAppSelector((state) => state.followingPage.offlineVideos.error);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadOfflineVideos());
    }
  }, [dataStatus, dispatch, areSubscriptionsStale]);

  return (
    <div>
      {dataStatus === DataStatus.REJECTED && <ErrorBox message={error || ErrorMessage.DEFAULT} />}
      {videos.length > 0 || dataStatus !== DataStatus.FULFILLED ? (
        <VideosBlock
          loadingStatus={dataStatus}
          videoCards={videos.map((video) => {
            return <VideoCardMain video={video} isLightTheme={isLightTheme} key={video.id} />;
          })}
        />
      ) : (
        <NoVideosYet />
      )}
    </div>
  );
};

export { OfflineVideosTab };
