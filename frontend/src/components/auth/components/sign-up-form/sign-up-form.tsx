import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
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
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            name={getNameOf<UserSignUpRequestDto>('email')}
            control={control}
            errors={errors}
          />
        </p>
        <p>
          <Input
            type="text"
            label="Password"
            placeholder="Enter your password"
            name={getNameOf<UserSignUpRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </p>
        <Button type="submit" label="Sign up" />
      </form>
    </>
  );
};

export { SignUpForm };
