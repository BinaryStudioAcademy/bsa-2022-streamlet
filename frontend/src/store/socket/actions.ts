import { createAction } from '@reduxjs/toolkit';
import { ActionType } from './common';

const removeSocketId = createAction(ActionType.REMOVE_SOCKET_ID);

const addSocketId = createAction<string>(ActionType.ADD_SOCKET_ID);

export { addSocketId, removeSocketId };
