import { AppRoutes, IconName } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from '../common';
import { Icon } from '../icon';

import styles from './logo.module.scss';

type Props = {
  size: number;
  isMobile?: boolean;
  className?: string;
};

const Logo: FC<Props> = ({ size, isMobile = false, className = '' }) => {
  return (
    <div className={className}>
      <Link className={styles['logo-link']} to={AppRoutes.ROOT}>
        <Icon name={IconName.MAIN_LOGO} width={`${size}`} height={`${size}`} />
        {!isMobile && (
          <p className={styles['main-name']} style={{ fontSize: size / 1.15836, lineHeight: `${size / 1.15836}px` }}>
            streamlet
          </p>
        )}
      </Link>
    </div>
  );
};

export { Logo };
