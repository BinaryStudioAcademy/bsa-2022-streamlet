import { RoutesWithStudioHeader } from 'common/enums/app/app-route.enum';

const enumRoutesWithStudioHeader: Array<string> = Object.values(RoutesWithStudioHeader);

export const isRouteHasStudioNavigation = (currentRoute: string): boolean => {
  return enumRoutesWithStudioHeader.some((path) => {
    const pathRegex = new RegExp(path.replaceAll(':id', '.*?'));
    return pathRegex.test(currentRoute);
  });
};
