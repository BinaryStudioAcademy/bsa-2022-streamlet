import { AppRoute } from 'common/enums/enums';
import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Input, PasswordInput } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';

import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContinueWithParagraph, GoogleButton } from '../common/common';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';

import formStyles from '../form-controls.module.scss';

type Props = {
  onSubmit: (formValues: UserSignUpRequestDto) => void;
  isLoading: boolean;
};

const SignUpForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles['form-container']}>
        <Input
          wrapperClassName={formStyles['form-input']}
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          wrapperClassName={formStyles['form-input']}
          type="text"
          label="Username"
          placeholder="Enter your username"
          name="username"
          control={control}
          errors={errors}
        />
        <PasswordInput
          wrapperClassName={formStyles['form-input']}
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />
        <ContinueWithParagraph prompt="Already have an account?" linkTitle="Sign in" route={AppRoute.SIGN_IN} />
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading} name="Sign up" />
      </form>
      <p>or continue with</p>
      <GoogleButton disabled={isLoading} />
    </>
  );
};

export { SignUpForm };
