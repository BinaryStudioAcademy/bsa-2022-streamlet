import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';

type Props<T> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  inputClassName,
  labelClassName,
  wrapperClassName,
}: Props<T>): ReactElement | null => {
  const { field } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={wrapperClassName}>
      <label className={labelClassName} htmlFor={id}>
        <span>{label}</span>
      </label>
      <input {...field} type={type} placeholder={placeholder} className={inputClassName} id={id} />
      <span>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Input };
