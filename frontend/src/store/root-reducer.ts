import { reducer as auth } from './auth/reducer';
import { reducer as search } from './search/reducer';

const rootReducer = {
  auth,
  search,
};

export { rootReducer };
