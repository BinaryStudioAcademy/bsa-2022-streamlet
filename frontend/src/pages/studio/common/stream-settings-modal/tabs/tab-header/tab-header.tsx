import React, { FC } from 'react';
import { Tab } from '../tab/tab';
import { Tab as TabEnum } from '../tab.enum';
import { tabs } from '../tabs';
import styles from './styles.module.scss';

type Props = {
  setTab: (tab: TabEnum) => void;
  currentTab: TabEnum;
};

const TabHeader: FC<Props> = ({ setTab, currentTab }) => {
  return (
    <div className={styles['container']}>
      {Object.values(tabs).map((tabInfo) => (
        <Tab setTab={setTab} tabInfo={tabInfo} isActive={currentTab === tabInfo.tab} key={tabInfo.tab} />
      ))}
    </div>
  );
};

export { TabHeader };
