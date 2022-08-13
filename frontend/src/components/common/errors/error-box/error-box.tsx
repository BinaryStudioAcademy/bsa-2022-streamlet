import React, { FC } from 'react';
import styles from './error-box.module.scss';

type Props = {
  message: string;
};

const ErrorBox: FC<Props> = ({ message }) => {
  return <div className={styles.errorText}>{message}</div>;
};

export { ErrorBox };
