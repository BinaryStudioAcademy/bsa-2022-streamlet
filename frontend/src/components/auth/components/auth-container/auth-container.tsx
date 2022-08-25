import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import React, { ReactNode } from 'react';
import { ReactComponent as Zigzag } from 'assets/img/auth/auth-zigzag.svg';
import { ReactComponent as Curve1 } from 'assets/img/auth/auth-curve1.svg';
import { ReactComponent as Curve2 } from 'assets/img/auth/auth-curve2.svg';
import clsx from 'clsx';
import { Logo } from 'components/common/logo/logo';

type Props = {
  pageTitle: 'Sign in' | 'Sign up' | 'Restore password' | 'Account Verification';
  topLevelErrorComponent?: ReactNode | undefined;
  children: React.ReactNode;
  className?: string;
};

const AuthContainer: FC<Props> = ({ children, pageTitle, className, topLevelErrorComponent }) => {
  return (
    <div className={clsx(styles['auth-background'], className)}>
      <div className={styles['zigzag1-container']}>
        <Zigzag className={styles['background-zigzag']} />
      </div>
      <div className={styles['zigzag2-container']}>
        <Zigzag className={styles['background-zigzag2']} />
      </div>
      <div className={styles['zigzag3-container']}>
        <Zigzag className={styles['background-zigzag3']} />
      </div>
      <div className={styles['curve1-container']}>
        <Curve1 className={styles['background-curve1']} />
      </div>
      <div className={styles['curve2-container']}>
        <Curve2 className={styles['background-curve2']} />
      </div>
      <div className={styles['auth-modal']}>
        <div className={styles['auth-container']}>
          <div className={styles['auth-header']}>
            <Logo size={30} />
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
