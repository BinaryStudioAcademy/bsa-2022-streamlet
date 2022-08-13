import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Input, Link, PasswordInput } from 'components/common/common';
import googleLogo from 'assets/img/google.svg';
import 'assets/css/auth.scss';
import { useAppForm } from 'hooks/hooks';
import { userSignIn } from 'validation-schemas/validation-schemas';

type Props = {
  onSubmit: (formValues: SignInFormValues) => void;
};

export interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    validationSchema: userSignIn,
  });

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          type="email"
          wrapperClassName="form-input"
          placeholder="username@gmail.com"
        />
        <PasswordInput
          wrapperClassName="form-input"
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />
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
