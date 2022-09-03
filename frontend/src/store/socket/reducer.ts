import { createReducer } from '@reduxjs/toolkit';
import { addSocketId, removeSocketId } from './actions';

type State = {
  id: string;
};

const initialState: State = {
  id: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(removeSocketId, (state: State) => {
    state.id = initialState.id;
  });

  builder.addCase(addSocketId, (state: State, { payload }) => {
    state.id = payload;
  });
});

export { reducer };
