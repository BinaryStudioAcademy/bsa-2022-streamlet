import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Input, Link, PasswordInput } from 'components/common/common';
import { useAppForm, useAppSelector } from 'hooks/hooks';
import { userSignIn } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContinueWithParagraph, GoogleButton } from '../common/common';
import clsx from 'clsx';

import formStyles from '../form-controls.module.scss';
import styles from './styles.module.scss';

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
    mode: 'onChange',
  });

  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);

  return (
    <>
      <form className={formStyles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          errors={errors}
          name="email"
          label="Email"
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
          inputWrapperErrorClassName={isLightTheme ? formStyles['input-error'] : formStyles['input-error-dark']}
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
          changeVisibilityBtnClassName={formStyles['password-eye']}
        />
        <Link to={AppRoutes.RESTORE_PASSWORD_INIT} className={clsx(styles['forgot-password'], formStyles['link'])}>
          Forgot Password?
        </Link>
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={isLoading || !isValid}
          name="Sign in"
          className={formStyles['upper-space-regular']}
        />
      </form>
      <p className={formStyles['continue-with']}>or continue with</p>
      <GoogleButton disabled={isLoading} />

      <ContinueWithParagraph
        className={clsx(formStyles['upper-space-regular'], formStyles['paragraph-mobile'])}
        prompt="Don't have an account yet?"
        linkTitle="Sign up for free"
        route={AppRoutes.SIGN_UP}
      />
    </>
  );
};

export { SignInForm };
