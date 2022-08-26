import { SerializedHttpError } from 'helpers/http/http';
import { extraArgument } from 'store/store';
import { AppDispatch } from './app-dispatch.type';
import { RootState } from './root-state.type';

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
};

type AsyncThunkConfigHttpError = AsyncThunkConfig & {
  rejectValue: SerializedHttpError;
};

export { type AsyncThunkConfig, type AsyncThunkConfigHttpError };
