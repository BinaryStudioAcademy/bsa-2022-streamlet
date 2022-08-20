import { IconName, AppRoutes } from 'common/enums/enums';

export interface ISideBarItem {
  itemName: string;
  routeName: string;
}

export const sideBarItems: ISideBarItem[] = [
  { itemName: IconName.HOME, routeName: AppRoutes.STUDIO },
  { itemName: IconName.ANALYTICS, routeName: AppRoutes.ANALYTICS },
];
