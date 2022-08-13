import { AppRoute } from 'common/enums/enums';
import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link, Loader, PasswordInput } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';

import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';

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
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <Input
          wrapperClassName="form-input"
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          wrapperClassName="form-input"
          type="text"
          label="Username"
          placeholder="Enter your username"
          name="username"
          control={control}
          errors={errors}
        />
        <PasswordInput
          wrapperClassName="form-input"
          placeholder="Password"
          control={control}
          name="password"
          errors={errors}
          label="Password"
        />

        {isLoading ? (
          <Loader className="submit-btn-loader" />
        ) : (
          <Button className="auth-submit-btn" type="submit" label="Sign in" />
        )}
        <p className="continue-with-paragraph">
          Do you have already an account ?
          <Link to={AppRoute.SIGN_IN} className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export { SignUpForm };
