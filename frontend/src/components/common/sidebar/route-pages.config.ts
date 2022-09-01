import { AppRoute, AppRoutes, IconName } from 'common/enums/enums';

export interface RoutePage {
  id: number;
  linkTo: AppRoute;
  iconName: IconName;
  textLink: string;
  authRequired?: boolean;
}

export const configRoutePages: Array<RoutePage> = [
  {
    id: 1,
    linkTo: AppRoutes.ROOT,
    iconName: IconName.HOME,
    textLink: 'Home',
  },
  {
    id: 2,
    linkTo: AppRoutes.BROWSE,
    iconName: IconName.COMPASS,
    textLink: 'Browse',
  },
  {
    id: 3,
    linkTo: AppRoutes.FOLLOWING,
    iconName: IconName.FOLLOW,
    textLink: 'Following',
    authRequired: true,
  },
  {
    id: 4,
    linkTo: AppRoutes.HISTORY,
    iconName: IconName.TIME_AGO,
    textLink: 'History',
  },
];
