import { FC, FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  className?: string;
};

const Input: FC<Props> = ({ control, errors, label, name, placeholder = '', type = 'text', className }) => {
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
