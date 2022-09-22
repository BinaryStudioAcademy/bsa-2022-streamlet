import { Outlet } from 'react-router-dom';
import { FC } from 'common/types/types';
import { Tab } from './tabs/tab';
import { TabInfo } from './tabs/tab-info';
import { TabHeader } from './tabs/tab-header/tab-header';
import { useAppDispatch, useAppSelector, useEffect, useLocation, useMemo, useRef, useState } from 'hooks/hooks';

import styles from './styles.module.scss';
import { statsActions, streamActions } from 'store/actions';

const StudioAnalytics: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { channel } = useAppSelector((state) => ({
    channel: state.stream.channel,
  }));

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
        [Tab.VIEWS]: {
          tab: Tab.VIEWS,
          title: 'Views',
        },
        [Tab.WATCH_TIME]: {
          tab: Tab.WATCH_TIME,
          title: 'Watch time',
        },
        [Tab.FOLLOWERS]: {
          tab: Tab.FOLLOWERS,
          title: 'Followers',
        },
      } as const),
    [],
  );

  useEffect(() => {
    if (!channel) {
      dispatch(streamActions.getMyChannel());
    }
  }, [channel, dispatch]);

  useEffect(() => {
    if (activeSegment && Object.keys(tabs).includes(activeSegment) && activeSegment !== currentTab) {
      setCurrentTab(activeSegment as Tab);
    }
  }, [currentTab, activeSegment, tabs]);

  useEffect(() => {
    return () => {
      dispatch(statsActions.clearChannelStatsCharts());
    };
  }, [dispatch]);

  return (
    <div ref={pageContainerRef} className={styles['page-container']}>
      <div className={styles['page-header-container']}>
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
