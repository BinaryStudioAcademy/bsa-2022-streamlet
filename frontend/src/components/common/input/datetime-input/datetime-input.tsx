import { FormControl, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId } from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Props<T> = {
  control: FormControl<T>;
  label: string;
  name: FormControlPath<T>;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  defaultValue?: Date;
  readOnly?: boolean;
  disabled?: boolean;
};

const DatetimeInput = <T extends FieldValues>({
  control,
  label,
  name,
  inputClassName,
  labelClassName,
  wrapperClassName,
  defaultValue,
  readOnly = false,
  disabled = false,
}: Props<T>): ReactElement | null => {
  const { field } = useFormControl({ name, control });
  const id = useId();

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      <label className={clsx(styles.label, labelClassName)} htmlFor={id}>
        <span>{label}</span>
      </label>
      <DatePicker
        selected={field.value ?? defaultValue}
        onChange={field.onChange}
        className={clsx(styles.input, inputClassName)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

export { DatetimeInput };
