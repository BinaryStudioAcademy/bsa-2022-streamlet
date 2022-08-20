import { AppRoute, AppRoutes, IconName } from 'common/enums/enums';

export interface RoutePage {
  id: number;
  linkTo: AppRoute;
  iconName: IconName;
  textLink: string;
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
    iconName: IconName.COMPAS,
    textLink: 'Browse',
  },
  {
    id: 3,
    linkTo: AppRoutes.FOLLOWING,
    iconName: IconName.FOLLOW,
    textLink: 'Following',
  },
  {
    id: 4,
    linkTo: AppRoutes.HISTORY,
    iconName: IconName.TIMEAGO,
    textLink: 'History',
  },
];
