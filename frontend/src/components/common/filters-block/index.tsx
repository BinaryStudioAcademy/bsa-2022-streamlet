import clsx from 'clsx';
import { FC } from 'common/types/types';
import { CategoryResponseDto } from 'shared/build';

import styles from './filters-block.module.scss';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import React, { ReactElement } from 'react';
import { LeftArrow, RightArrow } from '../vertical-scroll/vertical-scroll';

export type FilterItem = CategoryResponseDto & {
  isActive: boolean;
};

export interface FilterBlockProps {
  filterList: Array<FilterItem>;
  className?: string;
  handleClickFilter: (id: string) => void;
  handleClickClearFilters: () => void;
  inRecommendedSection?: boolean;
}

const FiltersBlock: FC<FilterBlockProps> = ({ filterList, handleClickFilter, handleClickClearFilters }) => {
  return (
    <div className={styles['filter-block']}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} wrapperClassName={styles['horizontal-scroll']}>
        {filterList.map((filter): ReactElement => {
          const isItClearAllFilter = filter.id === '1' && filter.name === 'All';

          if (isItClearAllFilter) {
            const isActive = !filterList.filter((filter) => filter.isActive).length;
            return (
              <button
                onClick={handleClickClearFilters}
                key={filter.id}
                className={clsx({ [styles.active]: isActive }, styles['filter-item'])}
              >
                {filter.name}
              </button>
            );
          }

          return (
            <button
              onClick={(): void => handleClickFilter(filter.id)}
              key={filter.id}
              className={clsx({ [styles.active]: filter.isActive }, styles['filter-item'])}
            >
              {filter.name}
            </button>
          );
        })}
      </ScrollMenu>
    </div>
  );
};

export { FiltersBlock };
