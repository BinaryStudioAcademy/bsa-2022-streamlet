import { AppRoutes } from 'common/enums/enums';
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
  const { control, errors, handleSubmit, isValid } = useAppForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    validationSchema: userSignIn,
    mode: 'onTouched',
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
          inputClassName={formStyles['input']}
          inputErrorClassName={formStyles['input-error']}
          labelClassName={formStyles['label']}
          errorBlockClassName={formStyles['error']}
          wrapperClassName={formStyles['form-input']}
          placeholder="username@gmail.com"
        />
        <PasswordInput
          inputClassName={formStyles['password']}
          labelClassName={formStyles['label']}
          errorBlockClassName={formStyles['error']}
          wrapperClassName={formStyles['form-input']}
          inputWrapperErrorClassName={formStyles['input-error']}
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />
        <Link to={AppRoutes.RESTORE_PASSWORD_INIT} className={styles['forgot-password']}>
          Forgot Password?
        </Link>
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading || !isValid} name="Sign in" />
      </form>
      <p className={formStyles['continue-with']}>or continue with</p>
      <GoogleButton disabled={isLoading} />

      <ContinueWithParagraph
        prompt="Don't have an account yet?"
        linkTitle="Sign up for free"
        route={AppRoutes.SIGN_UP}
      />
    </>
  );
};

export { SignInForm };
