import { createAction } from '@reduxjs/toolkit';
import { ActionsType } from './common';

const openSidebar = createAction(ActionsType.OPEN_SIDEBAR);

const closeSidebar = createAction(ActionsType.CLOSE_SIDEBAR);

export { openSidebar, closeSidebar };
