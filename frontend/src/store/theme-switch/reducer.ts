import { createReducer } from '@reduxjs/toolkit';
import { switchTheme } from './actions';

interface InitState {
  isWhiteTheme: boolean;
}

const initialState: InitState = {
  isWhiteTheme: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(switchTheme, (state) => {
    state.isWhiteTheme = !state.isWhiteTheme;
  });
});

export { reducer };
