import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  content: ReactNode;
  isActive?: boolean;
  onClick: () => void;
};

const TabButton: FC<Props> = ({ content, onClick, isActive = false }) => {
  return (
    <button onClick={onClick} className={clsx(styles['button'], { [styles['active']]: isActive })}>
      {content}
    </button>
  );
};

export { TabButton };
