import { DateOption, SortByOption } from '~/shared/enums/enums';

export type ChannelSearch = {
  searchText: string | undefined;
  date: DateOption;
  sortBy: SortByOption[];
};
