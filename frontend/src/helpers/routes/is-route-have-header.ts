import { ROUTES_WITHOUT_HEADER } from 'common/enums/app/routes-without-header';

export const isRouteHaveHeader = (currentRoute: string): boolean => {
  return ROUTES_WITHOUT_HEADER.includes(currentRoute);
};
