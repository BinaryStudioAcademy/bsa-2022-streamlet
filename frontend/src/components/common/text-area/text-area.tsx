import { useFormControl } from 'hooks/hooks';
import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';

import styles from './styles.module.scss';

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
  placeholder = '',
  inputClassName,
  labelClassName,
  inputErrorClassName,
  wrapperClassName,
  onFocus,
  onBlur,
  label,
}: Props<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error, isTouched },
  } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['textarea-wrapper'], wrapperClassName)}>
      <label className={clsx(styles['textarea-label'], labelClassName)} htmlFor={id}>
        {label}
      </label>
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
