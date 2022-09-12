import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Input, PasswordInput } from 'components/common/common';
import { useAppForm, useAppSelector } from 'hooks/hooks';

import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContinueWithParagraph, GoogleButton } from '../common/common';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';

import formStyles from '../form-controls.module.scss';
import { AppRoutes } from 'common/enums/enums';

type Props = {
  onSubmit: (formValues: UserSignUpRequestDto) => void;
  isLoading: boolean;
};

const SignUpForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit, isValid } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
    mode: 'onChange',
  });

  const isLightTheme = useAppSelector((store) => store.theme.isLightTheme);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles['form-container']}>
        <Input
          wrapperClassName={formStyles['form-input']}
          inputClassName={formStyles['input']}
          inputErrorClassName={formStyles['input-error']}
          errorBlockClassName={formStyles['error']}
          labelClassName={formStyles['label']}
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          wrapperClassName={formStyles['form-input']}
          inputClassName={formStyles['input']}
          inputErrorClassName={formStyles['input-error']}
          errorBlockClassName={formStyles['error']}
          labelClassName={formStyles['label']}
          type="text"
          label="Username"
          placeholder="Enter your username"
          name="username"
          control={control}
          errors={errors}
        />
        <div className={formStyles['input-row']}>
          <PasswordInput
            inputClassName={formStyles['password']}
            labelClassName={formStyles['label']}
            wrapperClassName={formStyles['form-input']}
            inputWrapperErrorClassName={isLightTheme ? formStyles['input-error'] : formStyles['input-error-dark']}
            placeholder="Password"
            control={control}
            name="password"
            errors={errors}
            label="Password"
            isValidationErrorOnTop={false}
            errorBlockClassName={formStyles['password-error']}
            changeVisibilityBtnClassName={formStyles['password-eye']}
          />
          <PasswordInput
            inputClassName={formStyles['password']}
            labelClassName={formStyles['label']}
            wrapperClassName={formStyles['form-input']}
            inputWrapperErrorClassName={isLightTheme ? formStyles['input-error'] : formStyles['input-error-dark']}
            placeholder="Confirm password"
            control={control}
            name="passwordConfirm"
            errors={errors}
            label="Confirm password"
            isValidationErrorOnTop={false}
            errorBlockClassName={formStyles['password-error']}
            changeVisibilityBtnClassName={formStyles['password-eye']}
          />
        </div>
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading || !isValid} name="Sign up" />
      </form>
      <p className={formStyles['continue-with']}>or continue with</p>
      <GoogleButton disabled={isLoading} />
      <ContinueWithParagraph
        prompt="Already have an account?"
        linkTitle="Sign in"
        route={AppRoutes.SIGN_IN}
        className={formStyles['upper-space-regular']}
      />
    </>
  );
};

export { SignUpForm };
