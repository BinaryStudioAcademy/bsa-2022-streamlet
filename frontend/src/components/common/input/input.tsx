import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import { ErrorBox } from '../errors';
import styles from './styles.module.scss';

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
    <div className={`${styles.inputWrapper} ${wrapperClassName}`}>
      <label className={`${styles.label} ${labelClassName}`} htmlFor={id}>
        <span>{label}</span>
      </label>
      <input {...field} type={type} placeholder={placeholder} className={`${styles.input} ${inputClassName}`} id={id} />
      <div className={styles.errorBlock}>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }): ReactElement => {
            return <ErrorBox message={message} />;
          }}
        />
      </div>
    </div>
  );
};

export { Input };
