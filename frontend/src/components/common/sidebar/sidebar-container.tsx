import { FC } from 'common/types/types';
import { Sidebar } from './sidebar';
import { subscribesList } from './subscription-list.mock';
import { configRoutePages } from './route-pages.config';
import { useLocation } from 'react-router-dom';

function returnIdActiveRoute(currentRoute: string): number {
  let idRoute = 0;

  configRoutePages.forEach((route) => {
    if (route.linkTo === currentRoute) {
      idRoute = route.id;
    }
  });

  return idRoute;
}

const SidebarContainer: FC = () => {
  const { pathname } = useLocation();

  return (
    <Sidebar
      subscribesList={subscribesList}
      configRoutePages={configRoutePages}
      activeRouteId={returnIdActiveRoute(pathname)}
    />
  );
};

export { SidebarContainer };
