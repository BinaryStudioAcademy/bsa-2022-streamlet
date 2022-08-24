import clsx from 'clsx';
import { FC } from 'common/types/types';

import styles from './filters-block.module.scss';

export interface FilterItem {
  id: number;
  filterName: string;
  isActive: boolean;
}

export interface FilterBlockProps {
  filterList: Array<FilterItem>;
  handleClickFilter: () => void;
}

const FiltersBlock: FC<FilterBlockProps> = ({ filterList, handleClickFilter }) => {
  return (
    <div className={styles['filter-block']}>
      {filterList.map((filter) => (
        <button
          onClick={handleClickFilter}
          key={filter.id}
          className={clsx({ [styles.active]: filter.isActive }, styles['filter-item'])}
        >
          {filter.filterName}
        </button>
      ))}
    </div>
  );
};

export { FiltersBlock };
