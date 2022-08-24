import { createAction } from '@reduxjs/toolkit';
import { ActionsType } from './common';

const openSidebar = createAction(ActionsType.OPEN_SIDEBAR);

const closeSidebar = createAction(ActionsType.CLOSE_SIDEBAR);

const lockScroll = createAction(ActionsType.LOCK_SCROLL);

const unlockScroll = createAction(ActionsType.UNLOCK_SCROLL);

export { openSidebar, closeSidebar, lockScroll, unlockScroll };
