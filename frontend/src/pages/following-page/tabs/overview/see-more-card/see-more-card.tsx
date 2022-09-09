import { Button } from 'components/common/common';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  text: string;
  onBtnClick: () => void;
};

const SeeMoreCard: FC<Props> = ({ onBtnClick, text }) => {
  return (
    <div className={styles['see-more-container']}>
      <Button content={text} className={styles['see-more-btn']} onClick={onBtnClick} />
    </div>
  );
};

export { SeeMoreCard };
