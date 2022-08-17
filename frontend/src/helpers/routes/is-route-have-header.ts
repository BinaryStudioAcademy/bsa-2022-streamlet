import { RoutesWithoutHeader } from 'common/enums/app/app-route.enum';

const enumRoutesWithOutHeader: Array<string> = Object.values(RoutesWithoutHeader);

export const isRouteHaveHeader = (currentRoute: string): boolean => {
  return enumRoutesWithOutHeader.includes(currentRoute);
};
