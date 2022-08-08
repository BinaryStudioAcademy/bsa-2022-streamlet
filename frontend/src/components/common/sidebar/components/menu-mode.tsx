import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { useLocation } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  data: { name: string; path: AppRoute };
};

const MenuMode: FC<Props> = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === data.path ? styles.active : ''}>
      <Link to={data.path}>{data.name}</Link>
    </li>
  );
};

export { MenuMode };
