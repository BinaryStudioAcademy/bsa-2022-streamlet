import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement } from 'react';

type Props<T> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  className?: string;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  className,
}: Props<T>): ReactElement | null => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={className}>
      <span>{label}</span>
      <input {...field} type={type} placeholder={placeholder} />
      <span>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
