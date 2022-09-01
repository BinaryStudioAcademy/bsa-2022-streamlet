import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const ScrollableVideosList: FC<Props> = ({ children }) => {
  return <div className={styles['scrollable-videos-container']}>{children}</div>;
};

export { ScrollableVideosList };
