import { IconName, MenuOptions } from 'common/enums/enums';

const matchMenuOptionWithIconName: Record<MenuOptions, IconName> = {
  [MenuOptions.Settings]: IconName.SETTINGS,
  [MenuOptions.Theme]: IconName.MOON,
  [MenuOptions.Logout]: IconName.LOGOUT,
};

const matchMenuOptionWithText: Record<MenuOptions, string> = {
  [MenuOptions.Settings]: 'Settings',
  [MenuOptions.Theme]: 'Theme',
  [MenuOptions.Logout]: 'Log Out',
};

export { matchMenuOptionWithIconName, matchMenuOptionWithText };
