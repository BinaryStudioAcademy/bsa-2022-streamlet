import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { CategoryResponseDto } from 'shared/build';
import { ActionType } from './common';

const getCategories = createAsyncThunk<CategoryResponseDto[], void, AsyncThunkConfig>(
  ActionType.GET_CATEGORIES,
  async (_payload, { extra: { categoryApi } }) => {
    const data = await categoryApi.getCategories();
    const categories = data.map((category) => {
      return {
        ...category,
        name: category.name
          .split('&')
          .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(' & '),
      };
    });
    categories.unshift({
      id: '1',
      name: 'All',
    });
    return categories;
  },
);

const activeCategory = createAction<{ id: string }>(ActionType.ACTIVE_CATEGORY);
const clearFilters = createAction(ActionType.CLEAR_FILTERS);

export { activeCategory, getCategories, clearFilters };
