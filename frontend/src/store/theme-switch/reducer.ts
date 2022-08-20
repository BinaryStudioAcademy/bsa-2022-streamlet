import { createReducer } from '@reduxjs/toolkit';
import { switchTheme } from './actions';

interface InitState {
  isLightTheme: boolean;
}

const initialState: InitState = {
  isLightTheme: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(switchTheme, (state) => {
    state.isLightTheme = !state.isLightTheme;
  });
});

export { reducer };
