import { DeepPartial, Mode, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset } from 'react-hook-form';

import { FormControl, FormControlErrors, FormControlValues, ValidationSchema } from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';

type UseAppFormArgs<T> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema<T>;
  mode?: Mode;
};
type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  isValid: boolean;
  reset: UseFormReset<T>;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
  mode = 'onSubmit',
}: UseAppFormArgs<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues,
    resolver: validationSchema ? getFormValidationResolver(validationSchema) : undefined,
    mode,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    control,
    register,
    errors,
    reset,
    isValid,
  };
};

export { useAppForm };
