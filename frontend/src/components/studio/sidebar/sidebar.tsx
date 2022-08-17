import { FC } from 'common/types/types';
import { Icon, Link } from 'frontend/src/components/common/common';
import { IconName, IconColor, AppRoute } from 'common/enums/enums';
import cn from 'clsx';
import { ISideBarItem, sideBarItems } from './config';
import { useLocation } from 'hooks/hooks';

import styles from './styles.module.scss';

const StudioSidebar: FC = () => {
  const { pathname } = useLocation();
  const getColor = (item: string): string => (pathname === item ? IconColor.GREEN : IconColor.WHITE);

  return (
    <aside className={styles.sidebar}>
      <Link to={AppRoute.ROOT}>
        <div className={styles.button}>
          <Icon name={IconName.LOGOTIP} />
        </div>
      </Link>

      {sideBarItems.map((item: ISideBarItem) => (
        <Link key={item.itemName} to={item.routeName as AppRoute}>
          <div className={cn(styles.button, styles.active)}>
            <Icon name={item.itemName} color={getColor(item.routeName)} />
          </div>
        </Link>
      ))}
    </aside>
  );
};

export { StudioSidebar };
