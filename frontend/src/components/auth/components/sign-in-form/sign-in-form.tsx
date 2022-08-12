import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Link } from 'components/common/common';
import { useState } from 'react';
import googleLogo from '../../../../assets/img/google.svg';
import passwordEye from '../../../../assets/img/password-eye.svg';
import '../../../../assets/css/auth.scss';

type Props = {
  onSubmit: () => void;
};

type PasswordType = 'password' | 'text';

const SignInForm: FC<Props> = () => {
  const [inputPasswordType, setInputPasswordType] = useState<PasswordType>('password');
  const handleChangeInputPasswordType = (): void => {
    if (inputPasswordType === 'password') {
      setInputPasswordType('text');
    } else {
      setInputPasswordType('password');
    }
  };
  return (
    <>
      <form className="form-container">
        <label htmlFor="sign-in-email-input">Email</label>
        <input id="sign-in-email-input" type="email" placeholder="username@gmail.com" />
        <label htmlFor="sign-in-password-input" className="sign-in-password-label">
          Password
        </label>
        <div className="sign-in-password-container">
          <input id="sign-in-password-input" type={inputPasswordType} placeholder="Password" />
          <Button
            onClick={handleChangeInputPasswordType}
            className="check-password-btn"
            label={<img src={passwordEye} alt="check" />}
          />
        </div>
        <Link to={AppRoute.RESTORE_PASSWORD} className="forgot-password">
          Forgot Password?
        </Link>
        <Button className="auth-submit-btn" type="submit" label="Sign in" />
      </form>
      <p className="continue-with-paragraph">or continue with</p>
      <Button className="google-btn" type="button" label={<img src={googleLogo} alt="Google" />} />
      <p className="continue-with-paragraph">
        Don't have an account yet?{' '}
        <Link to={AppRoute.SIGN_UP} className="auth-link">
          Register for free
        </Link>
      </p>
    </>
  );
};

export { SignInForm };
