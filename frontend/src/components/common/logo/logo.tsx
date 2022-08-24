import { AppRoutes, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from '../common';
import { Icon } from '../icon';

import styles from './logo.module.scss';

type Props = {
  size: number;
};

const Logo: FC<Props> = ({ size }) => {
  return (
    <Link className={styles['logo-link']} to={AppRoutes.ROOT}>
      <Icon name={IconName.MAIN_LOGO} width={`${size}`} height={`${size}`} />
      <p className={styles['main-name']} style={{ fontSize: size / 1.15836 }}>
        streamlet
      </p>
    </Link>
  );
};

export { Logo };
