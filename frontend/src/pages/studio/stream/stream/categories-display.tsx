import { prettyDisplayCategoryName } from 'helpers/categories/pretty-display-category-name';
import { useAppSelector } from 'hooks/hooks';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const CategoriesDisplay: FC = () => {
  const streamCategories = useAppSelector((state) => state.stream.stream?.categories);

  return (
    <div className={styles['text-field-container']}>
      <p className={styles['field-caption']}>Categories:</p>
      <p className={styles['field-value']}>
        {streamCategories?.length
          ? streamCategories.map((category) => prettyDisplayCategoryName(category.name)).join(', ')
          : '-'}
      </p>
    </div>
  );
};

export { CategoriesDisplay };
