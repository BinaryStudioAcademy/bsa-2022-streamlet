import { DateOption, ChannelSortByOption } from '~/shared/enums/enums';

export type ChannelSearch = {
  searchText: string;
  date: DateOption;
  sortBy: ChannelSortByOption[];
};
