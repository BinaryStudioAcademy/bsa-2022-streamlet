import { AppRoute, IconName } from 'common/enums/enums';

export interface RoutePage {
  id: number;
  linkTo: AppRoute;
  iconName: IconName;
  textLink: string;
}

export const configRoutePages: Array<RoutePage> = [
  {
    id: 1,
    linkTo: AppRoute.ROOT,
    iconName: IconName.HOME,
    textLink: 'Home',
  },
  {
    id: 2,
    linkTo: AppRoute.BROWSE,
    iconName: IconName.COMPAS,
    textLink: 'Browse',
  },
  {
    id: 3,
    linkTo: AppRoute.FOLLOWING,
    iconName: IconName.FOLLOW,
    textLink: 'Following',
  },
  {
    id: 4,
    linkTo: AppRoute.HISTORY,
    iconName: IconName.TIMEAGO,
    textLink: 'History',
  },
];
