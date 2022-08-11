import { FC } from 'common/types/types';

type Props = {
  label: string | JSX.Element;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
};

const Button: FC<Props> = ({ type = 'button', label, className, onClick }) => (
  <button className={className} onClick={onClick} type={type}>
    {label}
  </button>
);

export { Button };
