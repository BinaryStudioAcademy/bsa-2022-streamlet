import { AppRoutes } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Input } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { restorePasswordInit } from 'validation-schemas/validation-schemas';
import { AuthSubmitButton, ContinueWithParagraph } from '../common/common';
import formStyles from '../form-controls.module.scss';

type Props = {
  onSubmit: (data: RestorePasswordFormValues) => void;
  isLoading: boolean;
};

export interface RestorePasswordFormValues {
  email: string;
}

const RestorePasswordForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit, isValid } = useAppForm<RestorePasswordFormValues>({
    defaultValues: { email: '' },
    validationSchema: restorePasswordInit,
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
          inputClassName={formStyles['input']}
          inputErrorClassName={formStyles['input-error']}
          errorBlockClassName={formStyles['error']}
          labelClassName={formStyles['label']}
          wrapperClassName={formStyles['form-input']}
          placeholder="username@gmail.com"
        />
        <AuthSubmitButton
          isLoading={isLoading}
          disabled={isLoading || !isValid}
          name="Send"
          className={formStyles['upper-space-regular']}
        />
      </form>
      <ContinueWithParagraph
        linkTitle="Back to sign in"
        prompt="Changed your mind?"
        route={AppRoutes.SIGN_IN}
        className={formStyles['upper-space-regular']}
      />
    </>
  );
};

export { RestorePasswordForm };
