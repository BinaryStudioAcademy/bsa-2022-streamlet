import '../../../../assets/css/auth.scss';
import { FC } from 'common/types/types';
import React from 'react';
import logo from 'assets/img/logo.svg';
import zigzag from 'assets/img/auth/auth-zigzag.svg';
import element from 'assets/img/auth/auth-element.svg';

type Props = {
  pageTitle: 'Login' | 'Sign up' | 'Restore password';
  children: React.ReactNode;
};

const AuthContainer: FC<Props> = ({ children, pageTitle }) => {
  return (
    <div className="auth-background">
      <img src={zigzag} className="background-zigzag" alt="zigzag" />
      <img src={zigzag} className="background-zigzag-2" alt="zigzag" />
      <img src={element} className="background-element" alt="element" />
      <div className="auth-modal">
        <div className="auth-container">
          <img src={logo} className="auth-logo" alt="logo" />
          <h1 className="auth-title">{pageTitle}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthContainer };
