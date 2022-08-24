import { createReducer } from '@reduxjs/toolkit';
import { openSidebar, closeSidebar } from './actions';

interface InitState {
  isOpenSidebar: boolean;
  isScrollLocked: boolean;
}

const initialState: InitState = {
  isOpenSidebar: true,
  isScrollLocked: false,
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
