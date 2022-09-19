import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { NoVideosYet } from 'components/common/no-videos-yet/no-videos-yet';
import { VideosBlock } from 'components/common/videos-block/videos-block';
import { useAppSelector } from 'hooks/hooks';
import React, { FC, ReactNode } from 'react';
import { ChannelVideoCard } from './channel-video-card/channel-video-card';

type Props = {
  channelInfo: {
    id: string;
    name: string;
    avatar: string;
  };
};

const VideoSection: FC<Props> = ({ channelInfo }) => {
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

    if (videoIds.length === 0) {
      return <NoVideosYet />;
    }
    return (
      <VideosBlock
        loadingStatus={dataStatus}
        videoCards={videoIds.map((videoId) => {
          return <ChannelVideoCard key={videoId} videoId={videoId} channelInfo={channelInfo} />;
        })}
      />
    );
  };
  return <section>{getComponent()}</section>;
};

export { VideoSection };
