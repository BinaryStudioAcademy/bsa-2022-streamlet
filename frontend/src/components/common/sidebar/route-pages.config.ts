import { AppRoute, IconName } from 'common/enums/enums';

export interface RoutePage {
  id: number;
  linkTo: AppRoute;
  IconName: IconName;
  textLink: string;
}

export const configRoutePages: Array<RoutePage> = [
  {
    id: 1,
    linkTo: AppRoute.ROOT,
    IconName: IconName.HOME,
    textLink: 'Home',
  },
  {
    id: 2,
    linkTo: AppRoute.BROWSE,
    IconName: IconName.COMPAS,
    textLink: 'Browse',
  },
  {
    id: 3,
    linkTo: AppRoute.FOLLOWING,
    IconName: IconName.FOLLOW,
    textLink: 'Following',
  },
  {
    id: 4,
    linkTo: AppRoute.HISTORY,
    IconName: IconName.TIMEAGO,
    textLink: 'History',
  },
];
