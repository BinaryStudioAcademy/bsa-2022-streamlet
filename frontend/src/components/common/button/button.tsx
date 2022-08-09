import { FC } from 'common/types/types';

type Props = {
  label: string | JSX.Element;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button: FC<Props> = ({ type = 'button', label, onClick }) => (
  <button type={type} onClick={onClick}>
    {label}
  </button>
);

export { Button };
