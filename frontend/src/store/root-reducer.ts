import { reducer as auth } from './auth/reducer';
import { reducer as layout } from './layout/reducer';

const rootReducer = {
  auth,
  layout,
};

export { rootReducer };
