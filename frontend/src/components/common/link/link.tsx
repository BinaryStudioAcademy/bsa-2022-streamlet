import { FC } from 'common/types/types';
import { NavLink } from 'react-router-dom';
import { AppRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute;
};

const Link: FC<Props> = ({ children, to }) => <NavLink to={to}>{children}</NavLink>;

export { Link };
