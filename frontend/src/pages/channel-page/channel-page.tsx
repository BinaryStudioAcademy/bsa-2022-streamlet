import { AppParams } from 'common/enums/app/app-route.enum';
import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { statsActions } from 'store/actions';
import { loadChannel } from 'store/channel/actions';
import { AboutSection } from './components/about-section/about-section';
import { ChannelHeader } from './components/channel-header/channel-header';
import { Tabs } from './components/channel-header/channel-tabs/tabs.enum';
import { BannerSection } from './components/components';
import { VideoSection } from './components/video-section/video-section';
import styles from './styles.module.scss';

const ChannelPage: FC = () => {
  const { [AppParams.channelId]: channelId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!channelId) return;
    dispatch(loadChannel({ id: channelId }));
    dispatch(statsActions.getChannelOverviewData({ channelId }));

    return () => {
      dispatch(statsActions.clearChannelOverviewData());
    };
  }, [channelId, dispatch]);

  const channelDataStatus = useAppSelector((state) => state.channel.currentChannel.dataStatus);
  const channelInfo = useAppSelector((state) => state.channel.currentChannel.data);
  const channelError = useAppSelector((state) => state.channel.currentChannel.error);

  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Videos);

  const getChannelComponent = (): ReactElement => {
    if (channelDataStatus === DataStatus.PENDING) {
      return <Loader hCentered vCentered spinnerSize={LoaderSize.MD} />;
    }

    if (channelDataStatus === DataStatus.REJECTED) {
      return <ErrorBox message={channelError || ErrorMessage.DEFAULT} />;
    }

    return (
      <>
        {channelInfo && (
          <>
            {channelInfo.bannerImage && <BannerSection imageLink={channelInfo.bannerImage} />}
            <ChannelHeader setTab={setCurrentTab} currentTab={currentTab} />
            <div className={styles['content']}>
              {currentTab === Tabs.About && <AboutSection />}
              {currentTab === Tabs.Videos && <VideoSection channelInfo={channelInfo} />}
            </div>
          </>
        )}
      </>
    );
  };

  return <main className={styles['channel-page']}>{getChannelComponent()}</main>;
};

export { ChannelPage };
