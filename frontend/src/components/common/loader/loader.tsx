import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  size?: number;
  centered?: boolean;
  className?: string;
};

const Loader: FC<Props> = ({ size = 80, centered = true, className }) => {
  return (
    <div
      className={`${styles['lds-ring']} ${centered ? styles['centered'] : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export { Loader };
