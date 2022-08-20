import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Input } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { refreshPassword } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContonueWithParagraph } from '../common/common';
import formStyles from '../form-controls.module.scss';

type Props = {
  onSubmit: () => void;
};

export interface RestorePasswordFormValues {
  email: string;
}

const RestorePasswordForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit, isValid } = useAppForm<RestorePasswordFormValues>({
    defaultValues: { email: '' },
    validationSchema: refreshPassword,
    mode: 'onChange',
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
        <AuthSubmitButton isLoading={false} disabled={true || !isValid} name="Send" />
      </form>
      <ContonueWithParagraph linkTitle="Back to login" prompt="Changed your mind?" route={AppRoute.SIGN_IN} />
    </>
  );
};

export { RestorePasswordForm };
