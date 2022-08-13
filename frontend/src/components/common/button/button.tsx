import { FC } from 'common/types/types';
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = {
  content: React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ type = 'button', content, className, onClick, disabled = false }) => (
  <button className={classNames(styles.button, className)} onClick={onClick} type={type} disabled={disabled}>
    {content}
  </button>
);

export { Button };
