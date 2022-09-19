import { IconName, VideoMenuOptions } from 'common/enums/enums';
import { VideoPrivacy } from 'shared/build';

export const matchMenuOptionText: Record<VideoMenuOptions, string> = {
  [VideoMenuOptions.EDIT]: 'Edit title and description',
  [VideoMenuOptions.DELETE]: 'Delete',
  [VideoMenuOptions.DOWNLOAD]: 'Download',
};

export const matchMenuOptionIcon: Record<VideoMenuOptions, string> = {
  [VideoMenuOptions.EDIT]: IconName.EDIT,
  [VideoMenuOptions.DELETE]: IconName.DELETE,
  [VideoMenuOptions.DOWNLOAD]: IconName.DOWNLOAD,
};

export const allMenuOptions = [VideoMenuOptions.EDIT, VideoMenuOptions.DELETE, VideoMenuOptions.DOWNLOAD].map(
  (option) => ({
    type: option,
    text: matchMenuOptionText[option],
    icon: matchMenuOptionIcon[option],
  }),
);

export const allPrivacyMenuOptions = [VideoPrivacy.PUBLIC, VideoPrivacy.PRIVATE, VideoPrivacy.UNLISTED].map(
  (option) => ({
    type: option,
    text: option,
  }),
);
