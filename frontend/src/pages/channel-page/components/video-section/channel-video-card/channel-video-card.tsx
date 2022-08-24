import { EntityId } from '@reduxjs/toolkit';
import { VideoCard } from 'components/common/video-card/video-card';
import React, { FC } from 'react';
import { selectChannelVideoById } from 'store/channel/reducer';
import { store } from 'store/store';
import { StreamingStatus } from 'common/enums/enums';
import { getFormatDurationString } from 'helpers/helpers';

type Props = {
  videoId: EntityId;
  className?: string;
};

const ChannelVideoCard: FC<Props> = ({ videoId, className }) => {
  const videoData = selectChannelVideoById(store.getState(), videoId);
  if (!videoData) {
    return null;
  }
  return (
    <VideoCard
      creationDate={new Date(videoData.createdAt)}
      id={videoData.id}
      name={videoData.name}
      className={className}
      poster={videoData.poster}
      duration={videoData.durationSec ? getFormatDurationString(videoData.durationSec) : null}
      viewerNum={
        videoData.status === StreamingStatus.LIVE ? videoData.liveViews : videoData.liveViews + videoData.videoViews
      }
      isLive={videoData.status === StreamingStatus.LIVE}
    />
  );
};

export { ChannelVideoCard };
