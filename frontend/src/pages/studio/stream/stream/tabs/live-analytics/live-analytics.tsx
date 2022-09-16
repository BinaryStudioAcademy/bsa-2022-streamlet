import React, { FC, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Header } from './header/header';
import styles from './styles.module.scss';
import { All } from './tabs/all/all';
import { Chat } from './tabs/chat/chat';
import { Tab } from './tabs/tab.enum';
import { Views } from './tabs/views/views';

const LiveAnalytics: FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.VIEWS);
  const headerRef = useOutletContext() as HTMLElement | null;
  return (
    <div className={styles['analytics-container']}>
      {headerRef && (
        <Header
          portal={headerRef}
          onTabChange={(tab: Tab): void => {
            setCurrentTab(tab);
          }}
        />
      )}
      {currentTab === Tab.VIEWS && <Views />}
      {currentTab === Tab.CHAT && <Chat />}
      {currentTab === Tab.ALL && <All />}
    </div>
  );
};

export { LiveAnalytics };
