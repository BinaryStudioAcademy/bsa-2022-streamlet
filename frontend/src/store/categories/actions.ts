import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { prettyDisplayCategoryName } from 'helpers/categories/pretty-display-category-name';
import { CategoryResponseDto } from 'shared/build';
import { ActionType } from './common';

const getCategories = createAsyncThunk<CategoryResponseDto[], void, AsyncThunkConfig>(
  ActionType.GET_CATEGORIES,
  async (_payload, { extra: { categoryApi } }) => {
    const data = await categoryApi.getCategories();
    const categories = data.map((category) => {
      return {
        ...category,
        name: prettyDisplayCategoryName(category.name),
      };
    });
    return categories;
  },
);

const activeCategory = createAction<{ id: string }>(ActionType.ACTIVE_CATEGORY);
const clearFilters = createAction(ActionType.CLEAR_FILTERS);

export { activeCategory, getCategories, clearFilters };
