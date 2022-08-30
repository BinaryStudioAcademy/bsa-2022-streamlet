import React, { FC, useState } from 'react';
import { LiveVideosTab } from './tabs/live-videos/live-videos-tab';
import { OfflineVideosTab } from './tabs/offline-videos/offline-videos-tab';
import styles from './styles.module.scss';
import { Tab } from './tabs/tabs.enum';
import { TabInfo } from './tabs/tab-info';
import { TabHeader } from './tabs/tab-header/tab-header';

const tabs: Readonly<TabInfo[]> = [
  {
    tab: Tab.Live,
    title: 'Live',
    component: <LiveVideosTab />,
  },
  {
    tab: Tab.Offline,
    title: 'Videos',
    component: <OfflineVideosTab />,
  },
] as const;

const FollowingPage: FC = () => {
  const [currentTab, setCurrentTab] = useState(Tab.Live);

  return (
    <div>
      <TabHeader setTab={setCurrentTab} tabs={tabs} currentTab={currentTab} />
      <div className={styles['tab-container']}>{tabs[currentTab].component}</div>
    </div>
  );
};

export { FollowingPage };
