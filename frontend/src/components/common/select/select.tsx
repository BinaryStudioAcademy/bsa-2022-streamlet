import clsx from 'clsx';
import { FC, SelectOptions } from 'common/types/types';
import SelectInput from 'react-select';

type Props = {
  options: SelectOptions[];
  selectClassName?: string;
};

const Select: FC<Props> = ({ options, selectClassName }) => (
  // <div className={clsx(selectClassName)}>
  <SelectInput options={options} className={clsx(selectClassName)} />
  // </div>
);

export { Select };
