import { TabInfo } from '../tab-info';
import React, { FC } from 'react';
import { Tab as TabEnum } from '../tab.enum';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  tabInfo: TabInfo;
  className?: string;
  isActive?: boolean;
  setTab: (tab: TabEnum) => void;
};

const Tab: FC<Props> = ({ setTab, tabInfo, className, isActive = false }) => {
  return (
    <button
      onClick={(): void => {
        setTab(tabInfo.tab);
      }}
      className={clsx(styles['button'], className, isActive && styles['active'])}
    >
      {tabInfo.title}
    </button>
  );
};

export { Tab };
