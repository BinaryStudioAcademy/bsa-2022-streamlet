import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import React, { FC } from 'react';
import { loadLiveVideos } from 'store/following-page/actions';
import { NoVideosYet } from '../common/no-videos-yet/no-videos-yet';

const LiveVideosTab: FC = () => {
  const dispatch = useAppDispatch();
  const dataStatus = useAppSelector((state) => state.followingPage.liveVideos.dataStatus);
  const areSubscriptionsStale = useAppSelector((state) => state.followingPage.liveVideos.areSubscriptionsStale);
  const videos = useAppSelector((state) => state.followingPage.liveVideos.videos);
  const error = useAppSelector((state) => state.followingPage.liveVideos.error);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadLiveVideos());
    }
  }, [dataStatus, dispatch, areSubscriptionsStale]);

  return (
    <div>
      {dataStatus === DataStatus.REJECTED && <ErrorBox message={error || ErrorMessage.DEFAULT} />}
      {videos.length > 0 ? (
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

export { LiveVideosTab };
