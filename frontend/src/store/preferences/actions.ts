import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { CategoryResponseDto, UserBindCategoriesDto } from 'shared/build';
import { ActionType } from './common';

const chooseAllPreferences = createAsyncThunk<CategoryResponseDto[], void, AsyncThunkConfig>(
  ActionType.CHOOSE_ALL_PREFERENCES,
  async (_payload, { extra: { categoryApi, preferencesApi } }) => {
    const data = await categoryApi.getCategories();
    const categories = data.map((preference) => preference.id);

    const bindedPreferences = await preferencesApi.bindPreferences({
      categories,
    });

    return bindedPreferences;
  },
);

const bindPreferences = createAsyncThunk<CategoryResponseDto[], Omit<UserBindCategoriesDto, 'id'>, AsyncThunkConfig>(
  ActionType.BIND_PREFERENCES,
  async (payload, { extra: { preferencesApi } }) => {
    const bindedPreferences = await preferencesApi.bindPreferences(payload);

    return bindedPreferences;
  },
);

const loadPreferences = createAsyncThunk<CategoryResponseDto[], void, AsyncThunkConfig>(
  ActionType.LOAD_PREFERENCES,
  async (_payload, { extra: { preferencesApi } }) => {
    const bindedPreferences = await preferencesApi.getPreferences();

    return bindedPreferences;
  },
);

export { chooseAllPreferences, bindPreferences, loadPreferences };
