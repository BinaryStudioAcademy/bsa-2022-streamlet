import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

const ControlButton: FC<Props> = ({ onClick, className, children, onFocus, onBlur }) => {
  return (
    <button
      type="button"
      className={clsx(styles['button'], className)}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </button>
  );
};

export { ControlButton };
