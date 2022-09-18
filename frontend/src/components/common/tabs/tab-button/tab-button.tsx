import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  content: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick: () => void;
};

const TabButton: FC<Props> = ({ content, onClick, isActive = false, className }) => {
  return (
    <button onClick={onClick} className={clsx(styles['button'], { [styles['active']]: isActive }, className)}>
      {content}
    </button>
  );
};

export { TabButton };
