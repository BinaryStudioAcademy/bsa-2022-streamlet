import { StreamPrivacy } from '~/common/enums/enums';

type StreamUpdateRequestDto = {
  videoId: string;
  name?: string;
  description?: string;
  scheduledStreamDate?: Date;
  tags?: string[];
  categories?: string[];
  privacy?: StreamPrivacy;
  videoPath?: string;
  poster?: string;
  isChatEnabled?: boolean;
};

export { type StreamUpdateRequestDto };
