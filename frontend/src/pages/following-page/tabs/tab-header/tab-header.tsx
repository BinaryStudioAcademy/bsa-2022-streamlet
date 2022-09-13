import React, { FC } from 'react';
import { TabButton } from '../tab-button/tab-button';
import { TabInfo } from '../tab-info';
import { Tab } from '../tab';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { LeftArrow, RightArrow } from '../../../../components/common/vertical-scroll/vertical-scroll';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

type Props = {
  tabs: Readonly<TabInfo[]>;
  currentTab: Tab;
};

const TabHeader: FC<Props> = ({ tabs, currentTab }) => {
  const navigate = useNavigate();
  return (
    <nav className={styles['main-container']}>
      <ScrollMenu
        LeftArrow={<LeftArrow isFollowingOrBrowse={true} />}
        RightArrow={<RightArrow isFollowingOrBrowse={true} />}
        wrapperClassName={styles['horizontal-scroll']}
        scrollContainerClassName={styles['horizontal-scroll']}
      >
        {tabs.map((tabInfo) => {
          return (
            <TabButton
              key={tabInfo.tab}
              content={tabInfo.title}
              onClick={(): void => {
                navigate(tabInfo.tab);
              }}
              isActive={tabInfo.tab === currentTab}
            />
          );
        })}
      </ScrollMenu>
    </nav>
  );
};

export { TabHeader };
