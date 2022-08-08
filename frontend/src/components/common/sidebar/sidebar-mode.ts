import { AppRoute, IconName } from 'common/enums/enums';

const SidebarMode = [
  { mode: 'Home', path: AppRoute.ROOT, icon: IconName.HOUSE },
  { mode: 'Browse', path: AppRoute.BROWSE, icon: IconName.COMPASS },
  { mode: 'Following', path: AppRoute.FOLLOWING, icon: IconName.HOUSE },
  { mode: 'History', path: AppRoute.HISTORY, icon: IconName.CLOCK },
];
export { SidebarMode };
