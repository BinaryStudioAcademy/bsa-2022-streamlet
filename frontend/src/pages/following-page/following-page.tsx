import { FC, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Tab } from './tabs/tab';
import { TabInfo } from './tabs/tab-info';
import { TabHeader } from './tabs/tab-header/tab-header';
import { Outlet, useLocation } from 'react-router-dom';
import { Icon } from '../../components/common/icon';
import { IconName } from '../../common/enums/component/icon-name.enum';
import { IconColor } from '../../common/enums/component/icon-color.enum';

const FollowingPage: FC = () => {
  const { pathname } = useLocation();
  const activeSegment = pathname.slice(1).split('/').at(-1);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.OVERVIEW);

  const tabs: Readonly<Record<Tab, TabInfo>> = useMemo(
    () =>
      ({
        [Tab.OVERVIEW]: {
          tab: Tab.OVERVIEW,
          title: 'Overview',
        },
        [Tab.LIVE]: {
          tab: Tab.LIVE,
          title: 'Live',
        },
        [Tab.OFFLINE]: {
          tab: Tab.OFFLINE,
          title: 'Videos',
        },
      } as const),
    [],
  );

  useEffect(() => {
    if (activeSegment && Object.keys(tabs).includes(activeSegment) && activeSegment !== currentTab) {
      setCurrentTab(activeSegment as Tab);
    }
  }, [currentTab, activeSegment, tabs]);

  return (
    <div ref={pageContainerRef} className={styles['page-container']}>
      <div className={styles['page-header-container']}>
        <Icon name={IconName.FOLLOW} color={IconColor.GRAY} width={'40'} height={'40'}></Icon>
        <h2 className={styles['page-header']}>following</h2>
      </div>
      <TabHeader tabs={Object.values(tabs)} currentTab={currentTab} />
      <div className={styles['tab-container']}>
        <Outlet context={pageContainerRef} />
      </div>
    </div>
  );
};

export { FollowingPage };
