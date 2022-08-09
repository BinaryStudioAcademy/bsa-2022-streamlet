import { FC, FormControl, FormControlPath } from 'common/types/types';
import { useFormControl } from 'hooks/hooks';

type Props = {
  control: FormControl;
  name: FormControlPath;
  placeholder?: string;
  type?: 'text' | 'email' | 'date';
};

const SimpleInput: FC<Props> = ({ control, name, placeholder = '', type = 'text' }) => {
  const { field } = useFormControl({ name, control });

  return (
    <label>
      <input {...field} type={type} placeholder={placeholder} />
    </label>
  );
};

export { SimpleInput };
