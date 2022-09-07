import React, { FC } from 'react';
import { CategoryResponseDto } from 'shared/build';
import { CategoryCard } from './category-card';
import styles from './styles.module.scss';

interface CategoryBlockProps {
  categories: CategoryResponseDto[];
}

export const CategoryBlock: FC<CategoryBlockProps> = ({ categories }) => {
  return (
    <div className={styles['content-checklist']}>
      {categories.map(({ id, name, posterPath }) => (
        <CategoryCard key={id} name={name} posterPath={posterPath} id={id} />
      ))}
    </div>
  );
};
