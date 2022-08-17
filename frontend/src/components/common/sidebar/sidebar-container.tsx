import { FC } from 'common/types/types';
import { Sidebar } from './sidebar';
import { subscribesList } from './subscription-list.mock';
import { configRoutePages, RoutePage } from './route-pages.config';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch, useEffect } from 'hooks/hooks';
import { openSidebar } from 'store/layout/actions';
import { MobileSidebarProps } from '../mobile-sidebar/mobile-sidebar';

function returnIdActiveRoute(currentRoute: string): number {
  let currentLink: RoutePage | undefined;
  let matchLengths: number;

  configRoutePages.forEach((link) => {
    if (currentRoute.startsWith(link.linkTo)) {
      matchLengths = currentRoute.length - link.linkTo.length;

      if (matchLengths < currentRoute.length) {
        currentLink = link;
      }
    }
  });

  return currentLink ? currentLink.id : 0;
}

const SidebarContainer: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.layout.isOpenSidebar);

  useEffect(() => {
    dispatch(openSidebar());
  }, [pathname]);

  const closeMobileSidebar = (): void => {
    dispatch(openSidebar());
  };

  const mobileSidebarProps: MobileSidebarProps = {
    isSidebarOpen: isSidebarOpen,
    configRoutePages: configRoutePages,
    activeRouteId: returnIdActiveRoute(pathname),
    closeMobileSidebar,
  };

  return (
    <Sidebar
      isSidebarOpen={isSidebarOpen}
      subscribesList={subscribesList}
      configRoutePages={configRoutePages}
      activeRouteId={returnIdActiveRoute(pathname)}
      mobileSidebarProps={mobileSidebarProps}
    />
  );
};

export { SidebarContainer };
