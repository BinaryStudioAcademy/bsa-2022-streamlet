import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import { ErrorBox } from '../errors/errors';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Props<T> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  value?: string;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  inputClassName?: string;
  inputErrorClassName?: string;
  labelClassName?: string;
  errorBlockClassName?: string;
  wrapperClassName?: string;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  readOnly?: boolean;
  disabled?: boolean;
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
  errorBlockClassName,
  wrapperClassName,
  readOnly = false,
  disabled = false,
  onFocus,
  onBlur,
}: Props<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error },
  } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      <div className={styles['input-labels']}>
        <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
          <span>{label}</span>
        </label>
        <div className={clsx(errorBlockClassName)}>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }): ReactElement => {
              return <ErrorBox message={message} />;
            }}
          />
        </div>
      </div>
      <input
        {...field}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={clsx(styles.input, inputClassName, error && inputErrorClassName)}
        id={id}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export { Input };
