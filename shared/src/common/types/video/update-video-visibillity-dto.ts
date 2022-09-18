import { VideoPrivacy } from '~/common/enums/enums';

export type UpdateVideoVisibilityDto = {
  videoIds: string[];
  visibility: VideoPrivacy;
};
