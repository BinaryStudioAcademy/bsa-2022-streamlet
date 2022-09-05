import { FC } from 'common/types/types';
import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  content: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ type = 'button', content, className, onClick, disabled = false }) => (
  <button
    className={clsx(styles.button, className, disabled && styles.disabled)}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {content}
  </button>
);

export { Button };
