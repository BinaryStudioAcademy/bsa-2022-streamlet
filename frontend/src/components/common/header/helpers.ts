import { IconName, MenuOptions } from 'common/enums/enums';

const matchMenuOptionWithIconName: Record<MenuOptions, IconName> = {
  [MenuOptions.Settings]: IconName.SETTINGS,
  [MenuOptions.Theme]: IconName.SUN,
  [MenuOptions.SignOut]: IconName.SIGN_OUT,
};

const matchMenuOptionWithText: Record<MenuOptions, string> = {
  [MenuOptions.Settings]: 'Settings',
  [MenuOptions.Theme]: 'Light Theme',
  [MenuOptions.SignOut]: 'Sign Out',
};

export { matchMenuOptionWithIconName, matchMenuOptionWithText };
