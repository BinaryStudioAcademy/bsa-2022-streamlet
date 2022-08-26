import { FormControl, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Props<T> = {
  control: FormControl<T>;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  isReadOnly?: boolean;
};

const AreaInput = <T extends FieldValues>({
  control,
  label,
  name,
  placeholder = '',
  inputClassName,
  labelClassName,
  wrapperClassName,
  isReadOnly = false,
}: Props<T>): ReactElement | null => {
  const { field } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
        <span>{label}</span>
      </label>
      <textarea
        {...field}
        placeholder={placeholder}
        className={clsx(styles['input'], inputClassName)}
        id={id}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export { AreaInput };
