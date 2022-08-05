import { FC } from 'common/types/types';

type Props = {
  label: string;
  type?: 'button' | 'submit';
};

const Button: FC<Props> = ({ type = 'button', label }) => <button type={type}>{label}</button>;

export { Button };
