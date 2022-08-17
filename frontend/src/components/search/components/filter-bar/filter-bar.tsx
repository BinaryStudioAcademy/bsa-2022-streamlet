import { FC } from 'common/types/types';
import { IconName } from 'common/enums/enums';
import { useId, useAppDispatch, useAppSelector, useCallback } from 'hooks/hooks';
import { Icon } from 'components/common/common';
import {
  allTypeFilters,
  allDateFilters,
  SearchState,
  FilterType,
  TypeFilterId,
  DateFilterId,
} from 'components/search/config/config';
import { FilterBarSelect } from '../common/common';
import { searchActions } from 'store/actions';

import styles from './styles.module.scss';

const FilterBar: FC = () => {
  const dispatch = useAppDispatch();
  const {
    search: {
      activeFilterId: { [FilterType.TYPE]: activeTypeFilterId, [FilterType.DATE]: activeDateFilterId },
    },
  } = useAppSelector((state) => ({
    search: state.search,
  }));

  const toggleId = useId();

  const onChangeActiveFilterIds = useCallback(
    (filterIds: Partial<SearchState['activeFilterId']>) => dispatch(searchActions.setActiveFilterIds(filterIds)),
    [dispatch],
  );

  const onChangeTypeFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.TYPE]: id as TypeFilterId }),
    [onChangeActiveFilterIds],
  );
  const onChangeDateFilterId = useCallback(
    (id: string) => onChangeActiveFilterIds({ [FilterType.DATE]: id as DateFilterId }),
    [onChangeActiveFilterIds],
  );

  return (
    <div className={styles['filter-bar']}>
      <input type="checkbox" className={styles['filter-bar-toggle']} id={toggleId} />
      <label className={styles['filter-bar-title']} htmlFor={toggleId}>
        <Icon name={IconName.FILTER} />
        <span>filters</span>
      </label>
      <div className={styles['filter-bar-wrapper']}>
        <FilterBarSelect
          activeFilterId={activeTypeFilterId}
          onChangeFilterId={onChangeTypeFilterId}
          options={allTypeFilters}
        />
        <FilterBarSelect
          activeFilterId={activeDateFilterId}
          onChangeFilterId={onChangeDateFilterId}
          options={allDateFilters}
        />
      </div>
    </div>
  );
};

export { FilterBar };
