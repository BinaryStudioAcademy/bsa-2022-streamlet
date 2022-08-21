import { IconName, MenuOptions } from 'common/enums/enums';

const matchMenuOptionWithIconName: Record<MenuOptions, IconName> = {
  [MenuOptions.Settings]: IconName.SETTINGS,
  [MenuOptions.Theme]: IconName.MOON,
  [MenuOptions.SignOut]: IconName.SIGN_OUT,
};

const matchMenuOptionWithText: Record<MenuOptions, string> = {
  [MenuOptions.Settings]: 'Settings',
  [MenuOptions.Theme]: 'Theme',
  [MenuOptions.SignOut]: 'Sign Out',
};

export { matchMenuOptionWithIconName, matchMenuOptionWithText };
