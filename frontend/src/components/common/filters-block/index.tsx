import clsx from 'clsx';
import { FC } from 'common/types/types';
import { CategoryResponseDto } from 'shared/build';

import styles from './filters-block.module.scss';

export type FilterItem = CategoryResponseDto & {
  isActive: boolean;
};

export interface FilterBlockProps {
  filterList: Array<FilterItem>;
  handleClickFilter: () => void;
}

const FiltersBlock: FC<FilterBlockProps> = ({ filterList, handleClickFilter }) => {
  return (
    <div className={styles['filter-block']}>
      <div className={styles['filter-block-wrapper']}>
        <div className={styles['blur-container']} />
        {filterList.map((filter) => (
          <button
            onClick={handleClickFilter}
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
