import { RoutesWithoutHeader } from 'common/enums/enums';
import { isRouteHasStudioNavigation } from '../routes';

const enumRoutesWithOutHeader: Array<string> = Object.values(RoutesWithoutHeader);

export const isRouteHasDefaultNavigation = (currentRoute: string): boolean => {
  return !(enumRoutesWithOutHeader.includes(currentRoute) || isRouteHasStudioNavigation(currentRoute));
};
