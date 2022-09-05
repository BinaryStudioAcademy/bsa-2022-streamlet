import { StreamStatus } from '~/common/enums/enums';

export type SearchByTagResponseDto = {
  id: string;
  name: string;
  description: string;
  status: StreamStatus;
  videoPath: string;
  liveViews: number;
  videoViews: number;
};
