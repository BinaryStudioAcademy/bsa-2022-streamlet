import { VideoPrivacy } from '~/common/enums/enums';

export type UpdateVideoVisibilityDto = {
  videoId: string;
  visibility: VideoPrivacy;
};
