import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Input, PasswordInput } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles['form-container']}>
        <Input
          wrapperClassName={formStyles['form-input']}
          inputClassName={formStyles['input']}
          inputErrorClassName={formStyles['input-error']}
          labelClassName={formStyles['label']}
          type="email"
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
          labelClassName={formStyles['label']}
          type="text"
          label="Username"
          placeholder="Enter your username"
          name="username"
          control={control}
          errors={errors}
        />
        <PasswordInput
          inputClassName={formStyles['password']}
          labelClassName={formStyles['label']}
          wrapperClassName={formStyles['form-input']}
          inputWrapperErrorClassName={formStyles['input-error']}
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />
        <PasswordInput
          inputClassName={formStyles['password']}
          labelClassName={formStyles['label']}
          wrapperClassName={formStyles['form-input']}
          inputWrapperErrorClassName={formStyles['input-error']}
          placeholder="Confirm password"
          control={control}
          name="passwordConfirm"
          errors={errors}
          label="Confirm password"
        />
        <ContinueWithParagraph prompt="Already have an account?" linkTitle="Sign in" route={AppRoutes.SIGN_IN} />
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading || !isValid} name="Sign up" />
      </form>
      <p className={formStyles['continue-with']}>or continue with</p>
      <GoogleButton disabled={isLoading} />
    </>
  );
};

export { SignUpForm };
