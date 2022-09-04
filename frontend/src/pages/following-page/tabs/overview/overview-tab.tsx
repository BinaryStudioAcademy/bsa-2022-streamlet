import { DataStatus } from 'common/enums/enums';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { LiveBlock } from './live-block/live-block';
import { OfflineBlock } from './offline-block/offline-block';
import styles from './styles.module.scss';
import { NoVideosYet } from 'components/common/no-videos-yet/no-videos-yet';

const OverviewTab: FC = () => {
  const hasAnyBlock = useAppSelector(
    (state) =>
      state.followingPage.liveVideos.videos.length > 0 ||
      state.followingPage.liveVideos.dataStatus !== DataStatus.FULFILLED ||
      state.followingPage.offlineVideos.videos.length > 0 ||
      state.followingPage.offlineVideos.dataStatus !== DataStatus.FULFILLED,
  );

  return (
    <>
      {!hasAnyBlock && <NoVideosYet />}
      <div className={styles['blocks']}>
        <LiveBlock />
        <OfflineBlock />
      </div>
    </>
  );
};

export { OverviewTab };
