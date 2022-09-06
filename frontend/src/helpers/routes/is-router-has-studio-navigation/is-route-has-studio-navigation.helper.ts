import { AppParams, RoutesWithStudioHeader } from 'common/enums/app/app-route.enum';

const enumRoutesWithStudioHeader: Array<string> = Object.values(RoutesWithStudioHeader);
const pathParams = Object.values(AppParams);

export const isRouteHasStudioNavigation = (currentRoute: string): boolean => {
  return enumRoutesWithStudioHeader.some((path) => {
    return pathParams.some((param) => {
      const pathRegex = new RegExp(path.replaceAll(`:${param}`, '.*?'));
      return pathRegex.test(currentRoute);
    });
  });
};
