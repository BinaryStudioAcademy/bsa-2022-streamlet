import clsx from 'clsx';
import { FC } from 'common/types/types';
import { Button, Loader } from 'components/common/common';
import { ChatSetting, VideoChatContainer } from 'components/video-chat/video-chat-container';
import { StreamStatus } from 'shared/build';
import { ChatStyle } from 'common/enums/enums';

import styles from './styles.module.scss';
import { VideoPlayer } from 'components/common/video-player/video-player';
import { useAppSelector, useLocation, useNavigate, useState } from 'hooks/hooks';
import { CategoriesDisplay } from './categories-display';
import { TabHeader } from 'components/common/tabs/tab-header/tab-header';
import { Tab, tabs } from './tabs/tabs';
import { Outlet } from 'react-router-dom';
import { useLayoutEffect } from 'react';

type Props = {
  handleSettingsModalOpen(): void;
  handleChangeStreamStatus(): void;
};

const StudioStream: FC<Props> = ({ handleSettingsModalOpen, handleChangeStreamStatus }) => {
  const chatSettings: ChatSetting = {
    hideSetting: false,
  };

  const streamReadiness = useAppSelector((state) => state.stream.stream?.isReadyToStream);
  const streamVideoPath = useAppSelector((state) => state.stream.stream?.videoPath);
  const streamStatus = useAppSelector((state) => state.stream.stream?.status);
  const streamId = useAppSelector((state) => state.stream.stream?.id);
  const streamName = useAppSelector((state) => state.stream.stream?.name);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeSegment = pathname.slice(1).split('/').at(-1);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.SETTINGS);

  useLayoutEffect(() => {
    if (activeSegment && Object.keys(tabs).includes(activeSegment) && activeSegment !== currentTab) {
      setCurrentTab(activeSegment as Tab);
    }
  }, [currentTab, activeSegment]);

  return (
    <div className={styles['settings-container']}>
      <div className={styles['settings-block-container']}>
        <div className={styles['settings-block']}>
          <div className={styles['settings-block-common']}>
            <div className={styles['col-1']}>
              <div className={styles['preview-container']}>
                {streamReadiness ? (
                  <VideoPlayer
                    url={streamVideoPath ?? ''}
                    sizingProps={{ height: '100%', width: '100%' }}
                    isLive
                    mute
                    maxControlsShadowHeight="200px"
                    showControls={true}
                  />
                ) : (
                  <div className={styles['not-loaded-container']}>
                    <Loader color="white" spinnerSize="40px" hCentered={false} vCentered={false} />
                    <p>
                      Connect your streaming software, like OBS by using the key and url below. You should see the
                      stream preview, once the connection is established
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles['col-2']}>
              <div className={styles['status-container']}>
                <div className={styles['status']}>
                  <div className={clsx(styles['status-indicator'], streamReadiness && styles['live'])} />
                  <p className={styles['status-text']}>{!streamReadiness ? 'Not connected' : 'Connected'}</p>
                </div>
                <Button
                  content={
                    streamStatus === StreamStatus.WAITING
                      ? 'Go live'
                      : StreamStatus.LIVE
                      ? 'End stream'
                      : 'Disconnected'
                  }
                  className={clsx(styles['button'], styles['padding-button'], styles['live-button'])}
                  onClick={handleChangeStreamStatus}
                  disabled={
                    (!streamReadiness && streamStatus === StreamStatus.WAITING) ||
                    streamStatus === StreamStatus.FINISHED
                  }
                />
              </div>
              <div className={styles['stream-details']}>
                <div className={styles['first-line']}>
                  <div className={styles['text-field-container']}>
                    <p className={styles['field-caption']}>Title:</p>
                    <p className={styles['field-value']}>{streamName}</p>
                  </div>
                  <Button
                    content={'Edit'}
                    className={clsx(styles['button'], styles['padding-button'], styles['stream-edit'])}
                    onClick={handleSettingsModalOpen}
                    type="button"
                  />
                </div>
                <CategoriesDisplay />
              </div>
            </div>
          </div>
          <section className={styles['tab']}>
            <TabHeader
              tabs={Object.values(tabs)}
              currentTab={currentTab}
              onTabClick={(tab): void => {
                navigate(tab);
              }}
              containerClassName={styles['tab-header']}
            />
            <Outlet />
          </section>
        </div>
      </div>
      <div className={styles['chat-container']}>
        <VideoChatContainer videoId={streamId ?? ''} chatSettings={chatSettings} chatStyle={ChatStyle.GREEN} />
      </div>
    </div>
  );
};
export { StudioStream };
