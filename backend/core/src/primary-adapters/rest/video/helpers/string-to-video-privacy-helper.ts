import { VideoPrivacy } from 'shared/build';

export const stringToVideoPrivacyHelper = (str: string): VideoPrivacy => {
  return VideoPrivacy[str as unknown as VideoPrivacy];
};
