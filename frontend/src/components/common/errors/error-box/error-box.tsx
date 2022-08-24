import React, { FC, ReactNode } from 'react';
import styles from './error-box.module.scss';

type Props = {
  message: ReactNode;
};

const ErrorBox: FC<Props> = ({ message }) => {
  return <div className={styles['error-text']}>{message}</div>;
};

export { ErrorBox };
