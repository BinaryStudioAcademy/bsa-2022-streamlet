import { createAction } from '@reduxjs/toolkit';
import { ActionsType } from './common';

const switchTheme = createAction(ActionsType.SWITCH_THEME);

export { switchTheme };
