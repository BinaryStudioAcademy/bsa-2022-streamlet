import { createReducer } from '@reduxjs/toolkit';
import { switchTheme } from './actions';

interface InitState {
  isLightTheme: boolean;
}

const initialState: InitState = {
  isLightTheme: localStorage.getItem('light-theme') === 'true' || false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(switchTheme, (state) => {
    state.isLightTheme = !state.isLightTheme;
    localStorage.setItem('light-theme', state.isLightTheme.toString());
  });
});

export { reducer };
