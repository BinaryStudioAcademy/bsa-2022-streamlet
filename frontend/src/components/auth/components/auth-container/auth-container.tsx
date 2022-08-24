import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import React, { ReactNode } from 'react';
import logo from 'assets/img/logo.svg';
import { ReactComponent as Zigzag } from 'assets/img/auth/auth-zigzag.svg';
import { ReactComponent as Curve1 } from 'assets/img/auth/auth-curve1.svg';
import clsx from 'clsx';

type Props = {
  pageTitle: 'Sign in' | 'Sign up' | 'Restore password' | 'Account Verification';
  topLevelErrorComponent?: ReactNode | undefined;
  children: React.ReactNode;
  className?: string;
};

const AuthContainer: FC<Props> = ({ children, pageTitle, className, topLevelErrorComponent }) => {
  return (
    <div className={clsx(styles['auth-background'], className)}>
      <Zigzag className={styles['background-zigzag']} />
      <Zigzag className={styles['background-zigzag2']} />
      <Curve1 className={styles['background-curve1']} />
      <div className={styles['auth-modal']}>
        <div className={styles['auth-container']}>
          <div className={styles['auth-header']}>
            <img src={logo} className={styles['auth-logo']} alt="logo" />
            <h1 className={styles['auth-title']}>{pageTitle}</h1>
          </div>
          {topLevelErrorComponent}
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthContainer };
