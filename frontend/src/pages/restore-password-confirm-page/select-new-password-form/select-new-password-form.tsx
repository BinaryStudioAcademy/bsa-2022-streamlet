import { FC } from 'common/types/types';
import { PasswordInput } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import formStyles from 'components/auth/components/form-controls.module.scss';
import { AuthSubmitButton } from 'components/auth/components/common/common';
import * as Joi from 'joi';
import { UserValidationMessage } from 'shared/build/common/enums/enums';
import { restorePasswordConfirmBase } from 'shared/build';

type Props = {
  onSubmit: (data: SelectNewPasswordFormValues) => void;
  isLoading: boolean;
};

export interface SelectNewPasswordFormValues {
  password: string;
  passwordConfirm: string;
}

const extendedSchema = (restorePasswordConfirmBase as Joi.ObjectSchema<SelectNewPasswordFormValues>).keys({
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': UserValidationMessage.PASSWORDS_NOT_MATCH,
  }),
});

const SelectNewPasswordForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const { control, errors, handleSubmit, isValid } = useAppForm<SelectNewPasswordFormValues>({
    defaultValues: { password: '', passwordConfirm: '' },
    validationSchema: extendedSchema,
    mode: 'onChange',
  });

  return (
    <>
      <form className={formStyles['form-container']} onSubmit={handleSubmit(onSubmit)}>
        <div className={formStyles['input-row']}>
          <PasswordInput
            wrapperClassName={formStyles['form-input']}
            inputWrapperErrorClassName={formStyles['input-error']}
            errorBlockClassName={formStyles['password-error']}
            placeholder="Password"
            control={control}
            name="password"
            errors={errors}
            label="Select new password"
          />
          <PasswordInput
            wrapperClassName={formStyles['form-input']}
            inputWrapperErrorClassName={formStyles['input-error']}
            errorBlockClassName={formStyles['password-error']}
            placeholder="Confirm password"
            control={control}
            name="passwordConfirm"
            errors={errors}
            label="Confirm password"
          />
        </div>
        <AuthSubmitButton isLoading={isLoading} disabled={isLoading || !isValid} name="Submit" />
      </form>
    </>
  );
};

export { SelectNewPasswordForm };
