import { IconName, VideoMenuOptions } from 'common/enums/enums';

export const matchMenuOptionText: Record<VideoMenuOptions, string> = {
  [VideoMenuOptions.EDIT]: 'Edit title and description',
  [VideoMenuOptions.DELETE]: 'Delete',
};

export const matchMenuOptionIcon: Record<VideoMenuOptions, string> = {
  [VideoMenuOptions.EDIT]: IconName.EDIT,
  [VideoMenuOptions.DELETE]: IconName.DELETE,
};

export const allMenuOptions = [VideoMenuOptions.EDIT, VideoMenuOptions.DELETE].map((option) => ({
  type: option,
  text: matchMenuOptionText[option],
  icon: matchMenuOptionIcon[option],
}));
