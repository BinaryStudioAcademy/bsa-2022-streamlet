import { FC, FormControl, FormControlErrors, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath;
  placeholder?: string;
  type?: 'text' | 'email' | 'date';
};

const Input: FC<Props> = ({ control, errors, label, name, placeholder = '', type = 'text' }) => {
  const { field } = useFormControl({ name, control });

  return (
    <label>
      <span>{label}</span>
      <input {...field} type={type} placeholder={placeholder} />
      <span>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
