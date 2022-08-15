import { FC } from 'common/types/types';
import { NavLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
  className?: string;
};

const Link: FC<Props> = ({ children, to, className }) => (
  <NavLink className={className} to={to}>
    {children}
  </NavLink>
);

export { Link };
