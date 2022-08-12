import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, ErrorMessage, Input, Link } from 'components/common/common';
import { useState } from 'react';
import googleLogo from '../../../../assets/img/google.svg';
import passwordEye from '../../../../assets/img/password-eye.svg';
import '../../../../assets/css/auth.scss';
import { useAppForm } from 'hooks/hooks';

type Props = {
  onSubmit: () => void;
};

type PasswordType = 'password' | 'text';

interface FormValues {
  email: string;
  password: string;
}

const SignInForm: FC<Props> = () => {
  const [inputPasswordType, setInputPasswordType] = useState<PasswordType>('password');
  const { control, errors, register } = useAppForm<FormValues>({ defaultValues: { email: '', password: '' } });
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
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          type="email"
          className="sign-in-password-label"
          placeholder="username@gmail.com"
        />
        <label htmlFor="sign-in-password-input" className="sign-in-password-label">
          Password
        </label>
        <div className="sign-in-password-container">
          <input
            id="sign-in-password-input"
            type={inputPasswordType}
            placeholder="Password"
            {...register('password')}
          />
          <Button
            onClick={handleChangeInputPasswordType}
            className="check-password-btn"
            label={<img src={passwordEye} alt="check" />}
          />
        </div>
        <span>
          <ErrorMessage errors={errors} name="password" />
        </span>
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
