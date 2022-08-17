import { createReducer } from '@reduxjs/toolkit';
import { openSidebar, closeSidebar } from './actions';

interface InitState {
  isOpenSidebar: boolean;
}

const initialState: InitState = {
  isOpenSidebar: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openSidebar, (state) => {
      state.isOpenSidebar = true;
    })
    .addCase(closeSidebar, (state) => {
      state.isOpenSidebar = false;
    });
});

export { reducer };
