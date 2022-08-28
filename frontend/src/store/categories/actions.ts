import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { CategoryResponseDto } from 'shared/build';
import { ActionType } from './common';

const getCategories = createAsyncThunk<CategoryResponseDto[], void, AsyncThunkConfig>(
  ActionType.GET_CATEGORIES,
  async (_payload, { extra: { categoryApi } }) => {
    const data = await categoryApi.getCategories();
    return data;
  },
);

const activeCategory = createAction<{ id: string }>(ActionType.ACTIVE_CATEGORY);

export { activeCategory, getCategories };
