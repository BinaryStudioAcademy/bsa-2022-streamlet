import { useFormControl } from 'hooks/hooks';
import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { ErrorMessage } from '../common';
import { ErrorBox } from '../errors/errors';

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
  errorBlockClassName?: string;
  wrapperClassName?: string;
  onFocus?: { (): void };
  onBlur?: { (): void };
};

const Textarea = <T extends FieldValues>({
  control,
  name,
  label,
  errors,
  placeholder = '',
  inputClassName,
  labelClassName,
  inputErrorClassName,
  wrapperClassName,
  errorBlockClassName,
  onFocus,
  onBlur,
}: Props<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error, isTouched },
  } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['textarea-wrapper'], wrapperClassName)}>
      <div className={styles['textarea-labels']}>
        <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
          <span>{label}</span>
        </label>
        <div className={clsx(errorBlockClassName)}>
          {isTouched && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }): ReactElement => {
                return <ErrorBox message={message} />;
              }}
            />
          )}
        </div>
      </div>
      <TextareaAutosize
        {...field}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={clsx(styles.textarea, inputClassName, error && isTouched && inputErrorClassName)}
        id={id}
      />
    </div>
  );
};

export { Textarea };
