import { createAction } from '@reduxjs/toolkit';
import { ActionsType } from './common';

const switchDark = createAction(ActionsType.SWITCH_DARK);
const switchLight = createAction(ActionsType.SWITCH_LIGHT);

export { switchDark, switchLight };
