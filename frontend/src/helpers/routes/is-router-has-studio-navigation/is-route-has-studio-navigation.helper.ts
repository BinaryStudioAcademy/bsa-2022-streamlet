import { RoutesWithStudioHeader } from 'common/enums/app/app-route.enum';

const enumRoutesWithStudioHeader: Array<string> = Object.values(RoutesWithStudioHeader);

export const isRouteHasStudioNavigation = (currentRoute: string): boolean => {
  return enumRoutesWithStudioHeader.includes(currentRoute);
};
