import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { refreshPassword } from 'validation-schemas/validation-schemas';

import '../../../../assets/css/auth.scss';

type Props = {
  onSubmit: () => void;
};

export interface RestorePasswordFormValues {
  email: string;
}

const RestorePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<RestorePasswordFormValues>({
    defaultValues: { email: '' },
    validationSchema: refreshPassword,
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
        <Button className="auth-submit-btn" type="submit" label="Send" />
      </form>
      <p className="continue-with-paragraph">
        <Link to={AppRoute.SIGN_IN} className="auth-link">
          Back to login
        </Link>
      </p>
    </>
  );
};

export { RestorePasswordForm };
