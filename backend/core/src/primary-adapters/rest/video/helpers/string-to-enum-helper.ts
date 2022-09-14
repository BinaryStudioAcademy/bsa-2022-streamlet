import { VideoPrivacy } from 'shared/build';

export const stringToEnumHelper = (str: string): VideoPrivacy => {
  return VideoPrivacy[str as unknown as VideoPrivacy];
};
