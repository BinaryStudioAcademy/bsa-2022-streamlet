import { Outlet } from 'react-router-dom';
import { FC } from 'common/types/types';
import { Tab } from './tabs/tab';
import { TabInfo } from './tabs/tab-info';
import { TabHeader } from './tabs/tab-header/tab-header';
import { useEffect, useLocation, useMemo, useRef, useState } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import { IconColor, IconName } from 'common/enums/enums';

import styles from './styles.module.scss';

const StudioAnalytics: FC = () => {
  const { pathname } = useLocation();
  const activeSegment = pathname.slice(1).split('/').at(-1);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  const [currentTab, setCurrentTab] = useState<Tab>(Tab.VIEWS);

  const tabs: Readonly<Record<Tab, TabInfo>> = useMemo(
    () =>
      ({
        [Tab.VIEWS]: {
          tab: Tab.VIEWS,
          title: 'Views',
        },
        [Tab.FOLLOWERS]: {
          tab: Tab.FOLLOWERS,
          title: 'Followers',
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
        <Icon name={IconName.ANALYTICS} color={IconColor.GRAY} width={'40'} height={'40'}></Icon>
        <h1 className={styles['page-header']}>Analytics</h1>
      </div>
      <TabHeader tabs={Object.values(tabs)} currentTab={currentTab} />
      <div className={styles['tab-container']}>
        <Outlet context={pageContainerRef} />
      </div>
    </div>
  );
};
export { StudioAnalytics };
