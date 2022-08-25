import React, { FC } from 'react';
import { ChannelTab } from './channel-tab/channel-tab';
import styles from './styles.module.scss';
import { Tabs } from './tabs.enum';

type Props = {
  setTab: (tab: Tabs) => void;
  currentTab: Tabs;
};

const ChannelTabs: FC<Props> = ({ setTab, currentTab }) => {
  return (
    <nav className={styles['channel-tabs']}>
      <ChannelTab
        name="Videos"
        className={styles['channel-tab']}
        onClick={(): void => setTab(Tabs.Videos)}
        isActive={currentTab === Tabs.Videos}
      />
      <ChannelTab
        name="About"
        className={styles['channel-tab']}
        onClick={(): void => setTab(Tabs.About)}
        isActive={currentTab === Tabs.About}
      />
    </nav>
  );
};

export { ChannelTabs };
