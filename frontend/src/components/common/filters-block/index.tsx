import clsx from 'clsx';
import { FC } from 'common/types/types';
import { CategoryResponseDto } from 'shared/build';

import styles from './filters-block.module.scss';

export type FilterItem = CategoryResponseDto & {
  isActive: boolean;
};

export interface FilterBlockProps {
  filterList: Array<FilterItem>;
  handleClickFilter: (id: string) => void;
  handleClickClearFilters: () => void;
}

const FiltersBlock: FC<FilterBlockProps> = ({ filterList, handleClickFilter, handleClickClearFilters }) => {
  const clearFilters: FilterItem = {
    id: '1',
    name: 'All',
    isActive: filterList.filter((filter) => filter.isActive).length ? false : true,
  };
  return (
    <div className={styles['filter-block']}>
      <div className={styles['filter-block-wrapper']}>
        <div className={styles['blur-container']} />
        {filterList.length !== 0 && (
          <button
            onClick={handleClickClearFilters}
            key={clearFilters.id}
            className={clsx({ [styles.active]: clearFilters.isActive }, styles['filter-item'])}
          >
            {clearFilters.name}
          </button>
        )}
        {filterList.map((filter) => (
          <button
            onClick={(): void => handleClickFilter(filter.id)}
            key={filter.id}
            className={clsx({ [styles.active]: filter.isActive }, styles['filter-item'])}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export { FiltersBlock };
