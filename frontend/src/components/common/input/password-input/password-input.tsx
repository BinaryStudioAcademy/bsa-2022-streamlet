import { FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { Button, ErrorMessage } from 'components/common/common';
import { FieldValues } from 'react-hook-form';
import { ReactElement, useId, useState } from 'react';
import { ErrorBox } from 'components/common/errors/errors';
import passwordEye from 'assets/img/password-eye.svg';
import styles from '../styles.module.scss';
import passwordStyles from './password-input.module.scss';
import clsx from 'clsx';

type Props<T> = {
  control: FormControl<T>;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath<T>;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  errorBlockClassName?: string;
  changeVisibilityBtnClassName?: string;
  inputWrapperClassName?: string;
  inputWrapperErrorClassName?: string;
};

type PasswordType = 'password' | 'text';

const PasswordInput = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  inputClassName,
  labelClassName,
  wrapperClassName,
  errorBlockClassName,
  inputWrapperClassName,
  inputWrapperErrorClassName,
  changeVisibilityBtnClassName,
}: Props<T>): ReactElement | null => {
  const {
    field,
    fieldState: { error },
  } = useFormControl({ name, control });
  const id = useId();

  const [inputPasswordType, setInputPasswordType] = useState<PasswordType>('password');
  const handleChangeInputPasswordType = (): void => {
    if (inputPasswordType === 'password') {
      setInputPasswordType('text');
    } else {
      setInputPasswordType('password');
    }
  };

  return (
    <div className={clsx(styles['input-wrapper'], wrapperClassName)}>
      <label className={clsx(styles['label'], labelClassName)} htmlFor={id}>
        <span>{label}</span>
      </label>
      <div
        className={clsx(
          passwordStyles['password-container'],
          inputWrapperClassName,
          error && inputWrapperErrorClassName,
        )}
      >
        <input
          {...field}
          type={inputPasswordType}
          placeholder={placeholder}
          className={clsx(styles['input'], inputClassName)}
          id={id}
        />
        <Button
          onClick={handleChangeInputPasswordType}
          className={clsx(passwordStyles['check-password-btn'], changeVisibilityBtnClassName)}
          content={<img src={passwordEye} alt="check" />}
        />
      </div>
      <div className={clsx(styles['error-block'], errorBlockClassName)}>
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

export { PasswordInput };
