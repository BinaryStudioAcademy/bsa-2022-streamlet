import { AppParams } from 'common/enums/app/app-route.enum';
import { DataStatus, ErrorMessage, LoaderSize } from 'common/enums/enums';
import { Loader } from 'components/common/common';
import { ErrorBox } from 'components/common/errors/errors';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadChannel } from 'store/channel-page/actions';
import { ChannelHeader } from './components/channel-header/channel-header';
import { BannerSection } from './components/components';
import styles from './styles.module.scss';

const ChannelPage: FC = () => {
  const { [AppParams.channelId]: channelId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(channelId);

    if (!channelId) return;
    dispatch(loadChannel({ id: channelId }));
  }, [channelId, dispatch]);

  const channelDataStatus = useAppSelector((state) => state.channelPage.currentChannel.dataStatus);
  const channelInfo = useAppSelector((state) => state.channelPage.currentChannel.data);
  const channelError = useAppSelector((state) => state.channelPage.currentChannel.error);

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
            <ChannelHeader />
          </>
        )}
      </>
    );
  };

  return <main className={styles['channel-page']}>{getChannelComponent()}</main>;
};

export { ChannelPage };
