import { IconName, AppRoutes } from 'common/enums/enums';

export interface ISideBarItem {
  itemName: string;
  routeName: string;
}

export const sideBarItems: ISideBarItem[] = [
  { itemName: IconName.HOME, routeName: AppRoutes.STUDIO },
  { itemName: IconName.TV, routeName: AppRoutes.STUDIO_CHANNEL },
  { itemName: IconName.CONTENT, routeName: AppRoutes.STUDIO_CONTENT },
  { itemName: IconName.ANALYTICS, routeName: AppRoutes.STUDIO_ANALYTICS },
];
