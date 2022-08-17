import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const ControlButton: FC<Props> = ({ onClick, className, children }) => {
  return (
    <button type="button" className={clsx(styles['button'], className)} onClick={onClick}>
      {children}
    </button>
  );
};

export { ControlButton };
