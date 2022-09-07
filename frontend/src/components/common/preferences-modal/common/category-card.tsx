import clsx from 'clsx';
import { IconName } from 'common/enums/enums';
import { Icon } from 'components/common/icon';
import { useAppDispatch } from 'hooks/hooks';
import React, { FC, useState } from 'react';
import { pickPreference } from 'store/preferences/actions';
import styles from './styles.module.scss';

interface CategoryCardProps {
  name: string;
  posterPath?: string;
  id: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ name, posterPath, id }) => {
  const dispatch = useAppDispatch();
  const [picked, setPicked] = useState(false);
  const handleClick = (): void => {
    setPicked(!picked);
    dispatch(pickPreference({ picked: !picked, id }));
  };
  return (
    <div className={styles['card-container']} onClick={handleClick}>
      <div className={clsx(styles['poster-container'], { [styles['picked']]: picked })}>
        {posterPath ? <img src={posterPath} /> : <Icon name={IconName.MAIN_LOGO} />}
      </div>
      <div className={styles['name-container']}>{name}</div>
    </div>
  );
};
