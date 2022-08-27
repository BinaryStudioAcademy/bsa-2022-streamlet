import { StreamStatus } from '~/common/enums/enums';

type VideoStreamResponseDto = {
  id: string;
  previewImage: string;
  status: StreamStatus;
  isReadyToStream: boolean;
  title: string;
  description: string;
  scheduledDate: string;
};

export { type VideoStreamResponseDto };
