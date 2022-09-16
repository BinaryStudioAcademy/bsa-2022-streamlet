import React, { FC } from 'react';
import { TabButton } from '../tab-button/tab-button';
import styles from './styles.module.scss';
import { LeftArrow, RightArrow } from '../../../../components/common/vertical-scroll/vertical-scroll';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { TabInfo } from '../tab-info';
import clsx from 'clsx';

type Props = {
  tabs: Readonly<TabInfo[]>;
  onTabClick: (tab: string) => void;
  currentTab: string;
  containerClassName?: string;
};

const TabHeader: FC<Props> = ({ tabs, currentTab, onTabClick, containerClassName }) => {
  return (
    <nav className={clsx(styles['main-container'], containerClassName)}>
      <ScrollMenu
        LeftArrow={<LeftArrow isFollowingOrBrowse={true} />}
        RightArrow={<RightArrow isFollowingOrBrowse={true} />}
        wrapperClassName={styles['horizontal-scroll']}
        scrollContainerClassName={styles['horizontal-scroll']}
      >
        {tabs.map((tab) => {
          return (
            <TabButton
              key={tab.tab}
              content={tab.title}
              onClick={(): void => {
                onTabClick(tab.tab);
              }}
              isActive={tab.tab === currentTab}
            />
          );
        })}
      </ScrollMenu>
    </nav>
  );
};

export { TabHeader };
