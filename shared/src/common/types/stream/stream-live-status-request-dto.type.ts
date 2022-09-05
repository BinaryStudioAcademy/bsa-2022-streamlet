import { StreamStatus } from '~/common/enums/enums';

type StreamLiveStatusRequestDto = {
  status: StreamStatus;
  videoId: string;
};

export { StreamLiveStatusRequestDto };
