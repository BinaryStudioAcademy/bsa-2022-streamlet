import { createAction } from '@reduxjs/toolkit';
import { ActionType } from './common';

const pickPreference = createAction<{ picked: boolean; id: string }>(ActionType.PICK_PREFERENCE);
const clearPreferences = createAction(ActionType.CLEAR_PREFERENCES);

export { clearPreferences, pickPreference };
