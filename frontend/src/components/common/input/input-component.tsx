import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import { ErrorBox } from '../errors/errors';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props<T> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  inputClassName?: string;
  inputErrorClassName?: string;
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
  inputErrorClassName,
  labelClassName,
  wrapperClassName,
}: Props<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error },
  } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
        <span>{label}</span>
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={clsx(styles.input, inputClassName, error && inputErrorClassName)}
        id={id}
      />
      <div className={styles['error-block']}>
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
