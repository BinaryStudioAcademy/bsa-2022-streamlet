import { DataStatus, ErrorMessage } from 'common/enums/enums';
import { VideoCardMain } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';
import { loadLiveVideos } from 'store/following-page/actions';
import { NoVideosYet } from 'components/common/no-videos-yet/no-videos-yet';

const LiveVideosTab: FC = () => {
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

  useEffect(() => {
    if (dataStatus === DataStatus.IDLE || areSubscriptionsStale) {
      dispatch(loadLiveVideos());
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

export { LiveVideosTab };
