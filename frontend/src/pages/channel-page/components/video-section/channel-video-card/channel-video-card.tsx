import { EntityId } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { selectChannelVideoById } from 'store/channel/reducer';
import { store } from 'store/store';
import { VideoCardMain } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';

type Props = {
  videoId: EntityId;
  channelInfo: {
    id: string;
    name: string;
    avatar: string;
  };
  className?: string;
};

const ChannelVideoCard: FC<Props> = ({ videoId, className, channelInfo }) => {
  const videoData = selectChannelVideoById(store.getState(), videoId);
  const isLightTheme = useAppSelector((state) => state.theme.isLightTheme);
  if (!videoData) {
    return null;
  }
  return (
    <VideoCardMain
      video={{
        publishedAt: videoData.publishedAt,
        id: videoData.id,
        name: videoData.name,
        poster: videoData.poster,
        duration: videoData.duration,
        liveViews: videoData.liveViews,
        status: videoData.status,
        scheduledStreamDate: videoData.scheduledStreamDate,
        videoViews: videoData.videoViews,
        channel: channelInfo,
      }}
      className={className}
      isLightTheme={isLightTheme}
      hideFromDisplay={{
        channelInfo: true,
      }}
    />
  );
};

export { ChannelVideoCard };
