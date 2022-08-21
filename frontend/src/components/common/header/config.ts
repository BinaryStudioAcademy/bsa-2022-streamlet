import { MenuOptions } from 'common/enums/enums';
import { matchMenuOptionWithIconName, matchMenuOptionWithText } from './helpers';

const allMenuOptions = [MenuOptions.Settings, MenuOptions.Theme, MenuOptions.SignOut].map((option) => ({
  type: option,
  text: matchMenuOptionWithText[option],
  icon: matchMenuOptionWithIconName[option],
}));

export { allMenuOptions };
