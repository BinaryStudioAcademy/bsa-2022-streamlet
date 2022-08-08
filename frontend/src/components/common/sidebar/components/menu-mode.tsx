import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import { useLocation } from 'hooks/hooks';
import { Icon } from '../../common';
import styles from './styles.module.scss';

type Props = {
  data: { mode: string; path: AppRoute; icon: string };
};

const MenuMode: FC<Props> = ({ data }) => {
  const { pathname } = useLocation();

  return (
    <li className={pathname === data.path ? styles.active : styles.inactive}>
      <Link to={data.path}>
        <Icon name={data.icon} className={styles.icon} />
        <div className={styles.mode}>{data.mode}</div>
      </Link>
    </li>
  );
};

export { MenuMode };
