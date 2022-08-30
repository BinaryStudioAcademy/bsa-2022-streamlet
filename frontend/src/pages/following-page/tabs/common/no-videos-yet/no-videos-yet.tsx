import React, { FC } from 'react';
import { ReactComponent as BedInCircle } from 'assets/img/bed-in-circle.svg';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const NoVideosYet: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(styles['container'], className)}>
      <h2 className={styles['header']}>
        Nothing to show here...<br></br> Come back later!
      </h2>
      <BedInCircle width={128} height={128} />
    </div>
  );
};

export { NoVideosYet };
