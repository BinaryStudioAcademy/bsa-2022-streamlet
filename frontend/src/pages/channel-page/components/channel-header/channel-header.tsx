import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import { ChannelInfo } from './channel-info/channel-info';
import { ChannelTabs } from './channel-tabs/channel-tabs';
import { Tabs } from './channel-tabs/tabs.enum';
import styles from './styles.module.scss';
import { Subscribe } from './subscribe/subscribe';

type Props = {
  setTab: (tab: Tabs) => void;
  currentTab: Tabs;
};

const ChannelHeader: FC<Props> = ({ setTab, currentTab }) => {
  const channelInfo = useAppSelector((state) => {
    const data = state.channel.currentChannel.data;
    return data
      ? {
          avatar: data.avatar,
          name: data.name,
          subscribersCount: data.subscribersCount,
        }
      : data;
  });
  if (!channelInfo) {
    return null;
  }
  return (
    <section className={styles['channel-header']}>
      <div className={styles['channel-upper-section']}>
        <ChannelInfo
          avatarLink={channelInfo.avatar}
          channelName={channelInfo.name}
          subscribersCount={channelInfo.subscribersCount}
          className={styles['channel-info']}
        />
        <div className={styles['subscribe-wrapper']}>
          <Subscribe signinModalClassname={styles['signin-modal']} />
        </div>
      </div>
      <ChannelTabs setTab={setTab} currentTab={currentTab} />
    </section>
  );
};

export { ChannelHeader };
