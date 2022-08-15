import { DeepPartial, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { FormControl, FormControlErrors, FormControlValues, ValidationSchema } from 'common/types/types';
import { getFormValidationResolver } from 'helpers/helpers';

type UseAppFormArgs<T> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema<T>;
};
type UseAppFormResult<T extends FormControlValues = FormControlValues> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  register: UseFormRegister<T>;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FormControlValues = FormControlValues>({
  validationSchema,
  defaultValues,
}: UseAppFormArgs<T>): UseAppFormResult<T> => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
    resolver: validationSchema ? getFormValidationResolver(validationSchema) : undefined,
  });

  return {
    handleSubmit: handleSubmit as UseFormHandleSubmit<T>,
    control,
    register,
    errors,
  };
};

export { useAppForm };
