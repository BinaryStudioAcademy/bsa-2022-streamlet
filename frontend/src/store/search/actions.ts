import { createAction } from '@reduxjs/toolkit';

import { ActionType } from './common';

const toggleShowFilter = createAction(ActionType.SHOW_FILTER);

export { toggleShowFilter };
