import { createReducer } from '@reduxjs/toolkit';
import { switchDark, switchLight } from './actions';

interface InitState {
  isLightTheme: boolean;
}

const initialState: InitState = {
  isLightTheme: localStorage.getItem('light-theme') === 'true' || false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(switchDark, (state) => {
    state.isLightTheme = false;
    localStorage.setItem('light-theme', state.isLightTheme.toString());
  });
  builder.addCase(switchLight, (state) => {
    state.isLightTheme = true;
    localStorage.setItem('light-theme', state.isLightTheme.toString());
  });
});

export { reducer };
