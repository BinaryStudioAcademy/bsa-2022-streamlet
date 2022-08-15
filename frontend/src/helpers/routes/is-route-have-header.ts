import { RoutesWithoutHeader } from 'common/enums/app/app-route.enum';

export const isRouteHaveHeader = (currentRoute: string): boolean => {
  return (Object.values(RoutesWithoutHeader) as string[]).includes(currentRoute);
};
