import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Input, Link, PasswordInput } from 'components/common/common';
import formStyles from '../form-controls.module.scss';
import styles from './styles.module.scss';
import { useAppForm } from 'hooks/hooks';
import { userSignIn } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContinueWithParagraph, GoogleButton } from '../common/common';

type Props = {
  onSubmit: (formValues: SignInFormValues) => void;
  isLoading: boolean;
};

export interface SignInFormValues {
  email: string;
  password: string;
}

const SignInForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit } = useAppForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    validationSchema: userSignIn,
  });

  return (
    <>
      <form className={formStyles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
          type="email"
          wrapperClassName={formStyles['form-input']}
          placeholder="username@gmail.com"
        />
        <PasswordInput
          wrapperClassName={formStyles['form-input']}
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />
        <Link to={AppRoute.RESTORE_PASSWORD} className={styles['forgot-password']}>
          Forgot Password?
        </Link>
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading} name="Sign in" />
      </form>
      <p>or continue with</p>
      <GoogleButton />

      <ContinueWithParagraph
        prompt="Don't have an account yet?"
        linkTitle="Sign up for free"
        route={AppRoute.SIGN_UP}
      />
    </>
  );
};

export { SignInForm };
