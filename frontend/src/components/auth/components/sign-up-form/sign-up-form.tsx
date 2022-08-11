import { AppRoute } from 'common/enums/enums';
import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';

import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          name={getNameOf<UserSignUpRequestDto>('email')}
          control={control}
          errors={errors}
          className="form"
        />
        <Input
          type="text"
          label="Username"
          placeholder="Enter your username"
          name={getNameOf<UserSignUpRequestDto>('username')}
          control={control}
          errors={errors}
          className="form"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          name={getNameOf<UserSignUpRequestDto>('password')}
          control={control}
          errors={errors}
          className="form"
        />
        <label htmlFor="password-input">Password</label>
        <input id="password-input" className="form" type="password" placeholder="Password" />

        <Button className="auth-submit-btn" type="submit" label="Sign up" />
        <p className="continue-with-paragraph">
          Do you have already an account ?{' '}
          <Link to={AppRoute.SIGN_IN} className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export { SignUpForm };
