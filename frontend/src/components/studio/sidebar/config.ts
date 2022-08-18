import { IconName, AppRoute } from 'common/enums/enums';

export interface ISideBarItem {
  itemName: string;
  routeName: string;
}

export const sideBarItems: ISideBarItem[] = [
  { itemName: IconName.HOME, routeName: AppRoute.STUDIO },
  { itemName: IconName.ANALYTICS, routeName: AppRoute.ANALYTICS },
];
