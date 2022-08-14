import { SearchQueryParam } from 'common/enums/enums';

type SearchQueryParamDto = {
  [key in SearchQueryParam]?: string;
};

export { type SearchQueryParamDto };
