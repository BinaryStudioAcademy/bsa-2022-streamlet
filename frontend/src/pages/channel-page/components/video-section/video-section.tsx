import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppSelector } from 'hooks/hooks';
import React, { FC, ReactNode } from 'react';
import { ChannelVideoCard } from './channel-video-card/channel-video-card';
import styles from './styles.module.scss';

const VideoSection: FC = () => {
  // when pagination is implemented
  // this component will probably be wrapped into InfiniteScroll
  // and dispatch an action like loadMoreVideos(...) to the channel-page store slice
  // currently all videos are fetch with channel info
  const videoIds = useAppSelector((state) => state.channel.currentChannelVideos.data.ids);

  const dataStatus = useAppSelector((state) => state.channel.currentChannelVideos.dataStatus);
  const error = useAppSelector((state) => state.channel.currentChannelVideos.error);
  const getComponent = (): ReactNode => {
    if (dataStatus === DataStatus.PENDING) {
      return <Loader hCentered vCentered spinnerSize={LoaderSize.MD} />;
    }

    if (dataStatus === DataStatus.REJECTED) {
      return <ErrorBox message={error || ErrorMessage.DEFAULT} />;
    }

    return videoIds.map((videoId) => (
      <ChannelVideoCard key={videoId} videoId={videoId} className={styles['video-card']} />
    ));
  };
  return <section className={styles['video-section']}>{getComponent()}</section>;
};

export { VideoSection };
