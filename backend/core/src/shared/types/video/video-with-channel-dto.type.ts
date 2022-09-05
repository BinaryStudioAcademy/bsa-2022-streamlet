import { Prisma, StreamingStatus } from '@prisma/client';
import { DateOption, DurationOption, VideoSortByOption } from '~/shared/enums/enums';

export type VideoWithChannel = Prisma.VideoGetPayload<{
  include: {
    channel: {
      select: {
        id: true;
        name: true;
        avatar: true;
      };
    };
  };
}>;

export type VideoSearch = {
  searchText: string | undefined;
  duration: DurationOption;
  date: DateOption;
  type: StreamingStatus[];
  sortBy: VideoSortByOption[];
};
