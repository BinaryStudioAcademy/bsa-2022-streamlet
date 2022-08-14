import { SearchQueryParam } from 'store/search/models';

type SearchQueryParamDto = {
  [key in SearchQueryParam]?: string;
};

export { type SearchQueryParamDto };
