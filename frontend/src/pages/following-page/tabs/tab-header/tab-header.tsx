import React, { FC } from 'react';
import { TabButton } from '../tab-button/tab-button';
import { TabInfo } from '../tab-info';
import { Tab } from '../tabs.enum';
import styles from './styles.module.scss';

type Props = {
  tabs: Readonly<TabInfo[]>;
  currentTab: Tab;
  setTab: (tab: Tab) => void;
};

const TabHeader: FC<Props> = ({ setTab, tabs, currentTab }) => {
  return (
    <nav className={styles['main-container']}>
      {tabs.map((tabInfo) => {
        return (
          <TabButton
            key={tabInfo.tab}
            content={tabInfo.title}
            onClick={(): void => {
              setTab(tabInfo.tab);
            }}
            isActive={tabInfo.tab === currentTab}
          />
        );
      })}
    </nav>
  );
};

export { TabHeader };
